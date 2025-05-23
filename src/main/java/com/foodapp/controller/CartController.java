package com.foodapp.controller;

import com.foodapp.dto.CartBodyDto;
import com.foodapp.dto.CartRequestDto;
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
@RequestMapping("/cart")
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
    public ResponseEntity<?> addQuantity(@Valid @RequestBody CartRequestDto request) {
        return userFoodOrderRepository.findById(request.orderId)
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
    public ResponseEntity<?> subQuantity(@Valid @RequestBody CartRequestDto request) {
        return userFoodOrderRepository.findById(request.orderId)
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
    public ResponseEntity<?> deleteCart(@Valid @RequestBody CartRequestDto request) {
        return userFoodOrderRepository.findById(request.orderId)
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
    public ResponseEntity<?> addCart(@Valid @RequestBody CartBodyDto body) {
        if (body.getUserId() == null || body.getFoodId() == null || body.getQuantity() <= 0) {
            return ResponseEntity.badRequest().body("Invalid input data.");
        }

        return userRepository.findById(body.getUserId())
            .map(user -> 
                foodRepository.findById(body.getFoodId())
                    .map(food -> {
                        UserFoodOrder order = new UserFoodOrder();
                        order.setUser(user);
                        order.setFood(food);
                        order.setQuantity(body.getQuantity());
                        order.setNote(body.getNote());

                        UserFoodOrder savedOrder = userFoodOrderRepository.save(order);

                        Map<String, Object> response = new HashMap<>();
                        response.put("status", "success");
                        response.put("message", "Cart item added successfully.");
                        response.put("orderId", savedOrder.getOrderId());
                        return ResponseEntity.ok(response);
                    })
                    .orElse(ResponseEntity.notFound().build())
            )
            .orElse(ResponseEntity.notFound().build());
    }
}