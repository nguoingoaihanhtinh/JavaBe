package com.foodapp.controller;

import java.util.Map;
import com.foodapp.model.UserFoodOrder;
import com.foodapp.repository.UserFoodOrderRepository;
import com.foodapp.repository.UserRepository;
import com.foodapp.repository.FoodRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/Cart")
public class CartController {

    private final UserFoodOrderRepository userFoodOrderRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;

    public CartController(UserFoodOrderRepository userFoodOrderRepository, 
                        UserRepository userRepository,
                        FoodRepository foodRepository) {
        this.userFoodOrderRepository = userFoodOrderRepository;
        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
    }

    @PostMapping("/addQuantity")
    public ResponseEntity<?> addQuantity(@RequestBody Map<String, Object> request) {
        Long orderId = Long.parseLong(request.get("orderId").toString());
        return userFoodOrderRepository.findById(orderId)
            .map(order -> {
                order.setQuantity(order.getQuantity() + 1);
                UserFoodOrder updatedOrder = userFoodOrderRepository.save(order);

                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("message", "Quantity increased successfully.");
                response.put("orderId", updatedOrder.getOrderId());
                response.put("newQuantity", updatedOrder.getQuantity());
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/subQuantity")
    public ResponseEntity<?> subQuantity(@RequestBody Map<String, Object> request) {
        Long orderId = Long.parseLong(request.get("orderId").toString());
        return userFoodOrderRepository.findById(orderId)
            .map(order -> {
                if (order.getQuantity() > 1) {
                    order.setQuantity(order.getQuantity() - 1);
                    UserFoodOrder updatedOrder = userFoodOrderRepository.save(order);

                    Map<String, Object> response = new HashMap<>();
                    response.put("status", "success");
                    response.put("message", "Quantity decreased successfully.");
                    response.put("orderId", updatedOrder.getOrderId());
                    response.put("newQuantity", updatedOrder.getQuantity());
                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.badRequest().body("Quantity cannot be less than 1.");
                }
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/deleteCart")
    public ResponseEntity<?> deleteCart(@RequestBody Map<String, Object> request) {
        Long orderId = Long.parseLong(request.get("orderId").toString());
        return userFoodOrderRepository.findById(orderId)
            .map(order -> {
                userFoodOrderRepository.delete(order);

                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("message", "Order deleted successfully.");
                response.put("orderId", order.getOrderId());
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/addCart")
    public ResponseEntity<?> addCart(@RequestBody Map<String, Object> body) {
        try {
            System.out.println("Received cart request body: " + body);
            
            Long userId = Long.parseLong(body.get("userId").toString());
            Long foodId = Long.parseLong(body.get("foodId").toString());
            Integer quantity = Integer.parseInt(body.get("quantity").toString());
            String note = body.get("note") != null ? body.get("note").toString() : null;

            System.out.println("Parsed values: userId=" + userId + ", foodId=" + foodId + ", quantity=" + quantity + ", note=" + note);

            if (userId == null || foodId == null || quantity <= 0) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Invalid input data"
                ));
            }

            return userRepository.findById(userId)
                .map(user ->
                    foodRepository.findById(foodId)
                        .map(food -> {
                            UserFoodOrder order = new UserFoodOrder();
                            order.setUser(user);
                            order.setFood(food);
                            order.setQuantity(quantity);
                            order.setNote(note);

                            UserFoodOrder savedOrder = userFoodOrderRepository.save(order);

                            Map<String, Object> response = new HashMap<>();
                            response.put("status", "success");
                            response.put("message", "Cart item added successfully.");
                            response.put("orderId", savedOrder.getOrderId());
                            return ResponseEntity.ok(response);
                        })
                        .orElse(ResponseEntity.ok(Map.of(
                            "status", "error",
                            "message", "Food not found"
                        )))
                )
                .orElse(ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "User not found"
                )));
        } catch (Exception e) {
            System.err.println("Error adding to cart: " + e.getMessage());
            return ResponseEntity.ok(Map.of(
                "status", "error",
                "message", "Failed to add item to cart: " + e.getMessage()
            ));
        }
    }
}