package com.foodapp.controller;

import com.foodapp.dto.UserFoodDto;
import com.foodapp.model.Food;
import com.foodapp.model.User;
import com.foodapp.model.UserFoodSaved;
import com.foodapp.repository.FoodRepository;
import com.foodapp.repository.UserFoodSavedRepository;
import com.foodapp.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/User")
public class UserFoodController {

    private final UserFoodSavedRepository userFoodSavedRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;

    public UserFoodController(
            UserFoodSavedRepository userFoodSavedRepository,
            UserRepository userRepository,
            FoodRepository foodRepository) {
        this.userFoodSavedRepository = userFoodSavedRepository;
        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
    }

    @PostMapping("/addFoodSaved")
    public ResponseEntity<?> addFoodSaved(@RequestBody Map<String, Object> body) {
        try {
            System.out.println("Received save food request body: " + body);
            
            Long userId = Long.parseLong(body.get("userId").toString());
            Long foodId = Long.parseLong(body.get("foodId").toString());

            System.out.println("Parsed values: userId=" + userId + ", foodId=" + foodId);

            if (userId == null || foodId == null) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Invalid input data"
                ));
            }

            var user = userRepository.findById(userId);
            if (user.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "User not found"
                ));
            }

            var food = foodRepository.findById(foodId);
            if (food.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Food not found"
                ));
            }

            if (userFoodSavedRepository.findByUser_UserIdAndFood_FoodId(userId, foodId).isPresent()) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Food already saved"
                ));
            }

            UserFoodSaved savedFood = new UserFoodSaved();
            savedFood.setUser(user.get());
            savedFood.setFood(food.get());
            userFoodSavedRepository.save(savedFood);

            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Food saved successfully"
            ));
        } catch (Exception e) {
            System.err.println("Error saving food: " + e.getMessage());
            return ResponseEntity.ok(Map.of(
                "status", "error",
                "message", "Failed to save food: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/removeFoodSaved")
    public ResponseEntity<?> removeFoodSaved(@RequestBody Map<String, Object> body) {
        try {
            System.out.println("Received remove saved food request body: " + body);
            
            Long userId = Long.parseLong(body.get("userId").toString());
            Long foodId = Long.parseLong(body.get("foodId").toString());

            System.out.println("Parsed values: userId=" + userId + ", foodId=" + foodId);

            if (userId == null || foodId == null) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Invalid input data"
                ));
            }

            var user = userRepository.findById(userId);
            if (user.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "User not found"
                ));
            }

            var food = foodRepository.findById(foodId);
            if (food.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Food not found"
                ));
            }

            var savedFood = userFoodSavedRepository.findByUser_UserIdAndFood_FoodId(userId, foodId);
            if (savedFood.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Saved food not found"
                ));
            }

            userFoodSavedRepository.delete(savedFood.get());
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Food removed from saved successfully"
            ));
        } catch (Exception e) {
            System.err.println("Error removing saved food: " + e.getMessage());
            return ResponseEntity.ok(Map.of(
                "status", "error",
                "message", "Failed to remove saved food: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/getAllFoodSaved")
    public ResponseEntity<?> getAllFoodSaved(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            System.out.println("Getting saved foods for userId=" + userId + ", page=" + page + ", limit=" + limit);

            if (userId <= 0) {
                return ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "Invalid user ID"
                ));
            }

            return userRepository.findById(userId)
                .map(user -> {
                    PageRequest pageRequest = PageRequest.of(page - 1, limit);
                    Page<UserFoodSaved> savedFoodsPage = userFoodSavedRepository.findByUser_UserId(userId, pageRequest);

                    var savedFoods = savedFoodsPage.getContent().stream()
                        .map(ufs -> Map.of(
                            "foodId", ufs.getFood().getFoodId(),
                            "foodName", ufs.getFood().getName(),
                            "image1", ufs.getFood().getImage1(),
                            "image2", ufs.getFood().getImage2(),
                            "image3", ufs.getFood().getImage3(),
                            "price", ufs.getFood().getPrice(),
                            "itemleft", ufs.getFood().getItemleft(),
                            "rating", ufs.getFood().getRating(),
                            "numberRating", ufs.getFood().getNumberRating(),
                            "description", ufs.getFood().getDescription()
                        ))
                        .collect(Collectors.toList());

                    return ResponseEntity.ok(Map.of(
                        "status", "success",
                        "data", savedFoods,
                        "pagination", Map.of(
                            "currentPage", page,
                            "pageSize", limit,
                            "totalItems", savedFoodsPage.getTotalElements(),
                            "totalPages", savedFoodsPage.getTotalPages()
                        )
                    ));
                })
                .orElse(ResponseEntity.ok(Map.of(
                    "status", "error",
                    "message", "User not found"
                )));
        } catch (Exception e) {
            System.err.println("Error getting saved foods: " + e.getMessage());
            return ResponseEntity.ok(Map.of(
                "status", "error",
                "message", "Failed to get saved foods: " + e.getMessage()
            ));
        }
    }
}