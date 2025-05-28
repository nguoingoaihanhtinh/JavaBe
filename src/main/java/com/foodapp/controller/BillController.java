package com.foodapp.controller;

import com.foodapp.model.*;
import com.foodapp.repository.*;
import com.foodapp.dto.*;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Bill") 
public class BillController {
    
    private static final Logger log = LoggerFactory.getLogger(BillController.class);
    private final BillRepository billRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;
    private final UserFoodOrderRepository userFoodOrderRepository;
    private final NotificationRepository notificationRepository;
    private final ObjectMapper objectMapper;

    public BillController(
            BillRepository billRepository,
            UserRepository userRepository,
            FoodRepository foodRepository,
            UserFoodOrderRepository userFoodOrderRepository,
            NotificationRepository notificationRepository,
            ObjectMapper objectMapper) {
        this.billRepository = billRepository;
        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
        this.userFoodOrderRepository = userFoodOrderRepository;
        this.notificationRepository = notificationRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/addBill")
    @Transactional
    public ResponseEntity<?> addBill(@Valid @RequestBody BillRequestDto body) {
        try {
            List<OrderInfoDto> foodInfoList = objectMapper.readValue(
                body.getFoodInfo(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, OrderInfoDto.class)
            );

            if (foodInfoList == null || foodInfoList.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "No food items provided"
                ));
            }

            // Validate and update food quantities
            for (OrderInfoDto order : foodInfoList) {
                Food food = foodRepository.findById(order.getFoodId())
                    .orElseThrow(() -> new RuntimeException("Food not found with id: " + order.getFoodId()));
                if (food.getItemleft() < order.getQuantity()) {
                    throw new RuntimeException("Not enough quantity for food ID " + order.getFoodId() +
                        ". Available: " + food.getItemleft());
                }
                food.setItemleft(food.getItemleft() - order.getQuantity());
                foodRepository.save(food);
            }

            // Delete cart items
            List<Long> orderIds = foodInfoList.stream()
                .map(OrderInfoDto::getOrderId)
                .collect(Collectors.toList());
            userFoodOrderRepository.deleteAllById(orderIds);

            // Extract phone from address JSON
            AddressDto addressDto = objectMapper.readValue(body.getAddress(), AddressDto.class);
            String phone = addressDto.getPhonenumber();

            // Create new bill
            Bill newBill = new Bill();
            newBill.setTotalPrice(body.getTotalPrice());
            newBill.setAddress(body.getAddress());
            newBill.setFoodInfo(body.getFoodInfo());
            newBill.setDate(LocalDateTime.now());
            newBill.setCreatedAt(LocalDateTime.now());
            newBill.setStatus("Pending");
            newBill.setPhone(phone);
            newBill.setUser(userRepository.findById(body.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));

            Bill savedBill = billRepository.save(newBill);

            // Create notification
            createNotification(
                "Đơn hàng được chấp nhận",
                "Đơn hàng #" + savedBill.getBillId() + " đã được tạo.",
                body.getUserId()
            );

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Bill created successfully",
                "bill", mapToBillResponse(savedBill)
            ));
        } catch (Exception e) {
            log.error("Error creating bill", e);
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping
    public ResponseEntity<?> getBillByUserId(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam Long userId) {
        
        int skip = (page - 1) * limit;
        List<Bill> bills = billRepository.findByUserUserId(userId);
        
        int fromIndex = Math.min(skip, bills.size());
        int toIndex = Math.min(skip + limit, bills.size());
        List<BillResponseDto> paginatedBills = bills.subList(fromIndex, toIndex)
            .stream()
            .map(this::mapToBillResponse)
            .collect(Collectors.toList());
        
        int totalBills = bills.size();
        int totalPages = (int) Math.ceil((double) totalBills / limit);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", paginatedBills);
        response.put("pagination", Map.of(
            "currentPage", page,
            "pageSize", limit,
            "totalItems", totalBills,
            "totalPages", totalPages
        ));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllBills() {
        try {
            List<BillResponseDto> bills = billRepository.findAll()
                .stream()
                .map(this::mapToBillResponse)
                .collect(Collectors.toList());

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", bills
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/getCompleted")
    public ResponseEntity<?> getCompletedBills() {
        try {
            List<BillResponseDto> bills = billRepository.findByStatus("Completed")
                .stream()
                .map(bill -> {
                    BillResponseDto dto = mapToBillResponse(bill);
                    dto.setTotalPrice(dto.getTotalPrice() - 12000); // Subtract delivery fee
                    return dto;
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", bills
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<?> updateBillStatus(
            @RequestParam Long id,
            @RequestParam String status) {
        try {
            Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

            bill.setStatus(status);
            Bill updatedBill = billRepository.save(bill);

            String header = "Đơn hàng được cập nhật";
            String content = switch (status) {
                case "Failed" -> "Đơn hàng #" + bill.getBillId() + " đã bị từ chối.";
                case "Pending" -> "Đơn hàng #" + bill.getBillId() + " đang chờ được duyệt.";
                case "Ongoing" -> "Đơn hàng #" + bill.getBillId() + " đang được giao.";
                case "Completed" -> "Đơn hàng #" + bill.getBillId() + " được thanh toán thành công.";
                default -> "Đơn hàng #" + bill.getBillId() + " đã được cập nhật.";
            };

            createNotification(header, content, bill.getUser().getUserId());

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", mapToBillResponse(updatedBill)
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable Long id) {
        try {
            Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

            billRepository.delete(bill);

            return ResponseEntity.ok(Map.of(
                "status", "success"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/getForManageCustomer")
    public ResponseEntity<?> getForManageCustomer() {
        try {
            List<User> users = userRepository.findAll();
            List<Bill> completedBills = billRepository.findByStatus("Completed");
            
            List<HashMap<String, Object>> result = new ArrayList<>();
            
            for (User user : users) {
                List<Bill> userBills = completedBills.stream()
                    .filter(b -> b.getUser().getUserId().equals(user.getUserId()))
                    .collect(Collectors.toList());

                long totalSpend = userBills.stream()
                    .mapToLong(Bill::getTotalPrice)
                    .sum() - (userBills.size() * 12000L);

                int totalQuantity = userBills.stream()
                    .mapToInt(bill -> {
                        try {
                            List<OrderInfoDto> foodInfo = objectMapper.readValue(bill.getFoodInfo(),
                                objectMapper.getTypeFactory().constructCollectionType(List.class, OrderInfoDto.class));
                            return foodInfo.stream()
                                .mapToInt(OrderInfoDto::getQuantity)
                                .sum();
                        } catch (Exception e) {
                            return 0;
                        }
                    })
                    .sum();

                HashMap<String, Object> userSummary = new HashMap<>();
                userSummary.put("userId", user.getUserId());
                userSummary.put("username", user.getUsername());
                userSummary.put("email", user.getEmail());
                userSummary.put("totalSpend", totalSpend);
                userSummary.put("totalQuantity", totalQuantity);
                
                result.add(userSummary);
            }

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", result
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }

    private BillResponseDto mapToBillResponse(Bill bill) {
        BillResponseDto dto = new BillResponseDto();
        dto.setBillId(bill.getBillId());
        dto.setDate(bill.getDate());
        dto.setTotalPrice(bill.getTotalPrice());
        dto.setAddress(bill.getAddress());
        dto.setStatus(bill.getStatus());
        dto.setFoodInfo(bill.getFoodInfo());
        
        BillResponseDto.UserDto userDto = new BillResponseDto.UserDto();
        userDto.setUserId(bill.getUser().getUserId());
        userDto.setUsername(bill.getUser().getUsername());
        userDto.setEmail(bill.getUser().getEmail());
        dto.setUser(userDto);
        
        return dto;
    }

    private void createNotification(String header, String content, Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = new Notification();
        notification.setHeader(header);
        notification.setContent(content);
        notification.setDate(LocalDateTime.now());
        notification.setUser(user);

        notificationRepository.save(notification);
    }
}