package com.foodapp.controller;

import com.foodapp.model.*;
import com.foodapp.repository.*;
import com.foodapp.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bill")
public class BillController {
    
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
            List<OrderInfoDto> foodInfoList = objectMapper.readValue(body.getFoodInfo(), 
                objectMapper.getTypeFactory().constructCollectionType(List.class, OrderInfoDto.class));

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

            // Create new bill
            Bill newBill = new Bill();
            newBill.setTotalPrice(body.getTotalPrice());
            newBill.setAddress(body.getAddress());
            newBill.setFoodInfo(body.getFoodInfo());
            newBill.setDate(LocalDateTime.now());
            newBill.setStatus("Pending");
            newBill.setUser(userRepository.findById(body.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));

            Bill savedBill = billRepository.save(newBill);

            // Create notification
            createNotification("Đơn hàng được chấp nhận", 
                "Đơn hàng #" + savedBill.getBillId() + " đã được tạo.",
                body.getUserId());

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Bill created successfully",
                "billId", savedBill.getBillId()
            ));

        } catch (Exception e) {
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
        
        // Apply pagination manually
        int fromIndex = Math.min(skip, bills.size());
        int toIndex = Math.min(skip + limit, bills.size());
        List<Bill> paginatedBills = bills.subList(fromIndex, toIndex);
        
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
            List<Bill> bills = billRepository.findAll();
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
            List<Bill> bills = billRepository.findByStatus("Completed");
            bills.forEach(bill -> bill.setTotalPrice(bill.getTotalPrice() - 12000));
            
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
            billRepository.save(bill);

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
                "data", Map.of(
                    "billId", bill.getBillId(),
                    "status", bill.getStatus()
                )
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
            
            // Subtract delivery fee from total price
            completedBills.forEach(bill -> bill.setTotalPrice(bill.getTotalPrice() - 12000));

            List<Map<String, Object>> result = users.stream()
                .map(user -> {
                    List<Bill> userBills = completedBills.stream()
                        .filter(b -> b.getUser().getUserId().equals(user.getUserId()))
                        .collect(Collectors.toList());

                    long totalSpend = userBills.stream()
                        .mapToLong(Bill::getTotalPrice)
                        .sum();

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

                    return Map.of(
                        "userId", user.getUserId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "totalSpend", totalSpend,
                        "totalQuantity", totalQuantity
                    );
                })
                .collect(Collectors.toList());

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