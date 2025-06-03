package com.foodapp.controller;

import java.util.Map;
import java.util.Optional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

import com.foodapp.dto.RatingBodyDto;
import com.foodapp.dto.UpdateRatingDto;
import com.foodapp.model.Food;
import com.foodapp.model.Rating;
import com.foodapp.repository.FoodRepository;
import com.foodapp.repository.RatingRepository;
import com.foodapp.repository.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;

import java.util.List;

@RestController
@RequestMapping("/Rating")
public class RatingController {

    private final RatingRepository ratingRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;


    public RatingController(RatingRepository ratingRepository, UserRepository userRepository, FoodRepository foodRepository) {
        this.ratingRepository = ratingRepository;
        this.foodRepository = foodRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getRatingsByFoodId(
            @RequestParam int page,
            @RequestParam int limit,
            @RequestParam int foodId) {

        if (foodId <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid food ID."));
        }

        if (page <= 0 || limit <= 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "Page and limit must be greater than zero."));
        }

        long totalItems = ratingRepository.countByFood_FoodId((long) foodId);

        int totalPages = (int) Math.ceil((double) totalItems / limit);

        var pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "date"));
        var ratings = ratingRepository.findByFoodIdWithUser(foodId, pageable);

        if (ratings.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "No ratings found for food ID " + foodId));
        }

        var data = ratings.stream().map(r -> {
            Map<String, Object> map = new HashMap<>();
            map.put("ratingId", r.getRatingId());
            map.put("userId", r.getUser().getUserId());
            map.put("foodId", r.getFood().getFoodId());
            map.put("content", r.getContent());
            map.put("date", r.getDate());
            map.put("ratingValue", r.getRatingValue());
            map.put("reply", r.getReply());
            map.put("dateReply", r.getDateReply());
            map.put("user", Map.of(
                "userId", r.getUser().getUserId(),
                "username", r.getUser().getUsername(),
                "email", r.getUser().getEmail(),
                "avatar", r.getUser().getAvatar()
            ));
            return map;
        });

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", data,
                "pagination", Map.of(
                        "currentPage", page,
                        "pageSize", limit,
                        "totalItems", totalItems,
                        "totalPages", totalPages
                )
        ));
    }

    @PostMapping
    public ResponseEntity<?> createRating(@RequestBody @Valid RatingBodyDto ratingBody) {
        boolean userExists = userRepository.existsById(ratingBody.getUserId());
        boolean foodExists = foodRepository.existsById(ratingBody.getFoodId());

        if (!userExists) {
            return ResponseEntity.badRequest().body(Map.of("message", "User does not exist."));
        }

        if (!foodExists) {
            return ResponseEntity.badRequest().body(Map.of("message", "Food item does not exist."));
        }

        Rating newRating = new Rating();
        newRating.setUser(userRepository.findById(ratingBody.getUserId()).orElseThrow());
        newRating.setFood(foodRepository.findById(ratingBody.getFoodId()).orElseThrow());
        newRating.setContent(ratingBody.getContent());
        newRating.setRatingValue((double) ratingBody.getRatingValue());
        newRating.setDate(java.time.LocalDateTime.now());

        ratingRepository.save(newRating);

        updateFoodRatingAndStats(ratingBody.getFoodId());

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Rating created successfully.",
                "data", "das"
        ));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateRating(@RequestBody @Valid UpdateRatingDto ratingBody) {
        try {
            Optional<Rating> optionalRating = ratingRepository.findById(ratingBody.getRatingId());

            if (optionalRating.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Rating not found for the given ID.");
                return ResponseEntity.status(404).body(response);
            }

            Rating rating = optionalRating.get();
            Long originalFoodId = rating.getFood() != null ? rating.getFood().getFoodId() : null;

            rating.setContent(ratingBody.getContent());
            rating.setRatingValue((double) ratingBody.getRatingValue());
            rating.setDate(LocalDateTime.now());

            ratingRepository.save(rating);
            updateFoodRatingAndStats(originalFoodId);

            Map<String, Object> data = new HashMap<>();
            data.put("ratingId", rating.getRatingId());
            data.put("userId", rating.getUser() != null ? rating.getUser().getUserId() : null);
            data.put("foodId", rating.getFood() != null ? rating.getFood().getFoodId() : null);
            data.put("content", rating.getContent());
            data.put("ratingValue", rating.getRatingValue());
            data.put("date", rating.getDate());
            data.put("reply", rating.getReply());
            data.put("dateReply", rating.getDateReply());

            if (rating.getUser() != null) {
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("userId", rating.getUser().getUserId());
                userMap.put("username", rating.getUser().getUsername());
                userMap.put("email", rating.getUser().getEmail());
                userMap.put("avatar", rating.getUser().getAvatar());
                data.put("user", userMap);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Rating updated successfully.");
            response.put("data", data);

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            ex.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "An error occurred while updating the rating.");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
    
    @DeleteMapping
    public ResponseEntity<?> deleteRating(@RequestParam("ratingId") int ratingId) {
        try {
            Optional<Rating> optionalRating = ratingRepository.findById((long) ratingId);

            if (optionalRating.isEmpty()) {
                Map<String, Object> notFoundResponse = new HashMap<>();
                notFoundResponse.put("message", "Rating not found for the given ID.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundResponse);
            }

            Rating rating = optionalRating.get();
            Long originalFoodId = rating.getFood().getFoodId();

            ratingRepository.delete(rating);
            ratingRepository.flush(); // Ensure deletion is executed immediately

            // Update food stats after deletion
            updateFoodRatingAndStats(originalFoodId);

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("status", "success");
            successResponse.put("message", "Rating deleted successfully.");
            return ResponseEntity.ok(successResponse);

        } catch (Exception ex) {
            ex.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "An error occurred while deleting the rating.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }   
    @Transactional
    public void updateFoodRatingAndStats(Long foodId) {
        try {
            List<Rating> foodRatings = ratingRepository.findByFood_FoodId(foodId);

            Optional<Food> optionalFood = foodRepository.findById(foodId);

            if (optionalFood.isEmpty()) {
                return;
            }

            Food food = optionalFood.get();

            if (foodRatings.isEmpty()) {
                food.setRating(0.0);
                food.setNumberRating(0);
                foodRepository.save(food);
                return;
            }

            double average = foodRatings.stream()
                    .mapToDouble(Rating::getRatingValue)
                    .average()
                    .orElse(0.0);

            int numberOfRatings = foodRatings.size();

            food.setRating(BigDecimal.valueOf(average).setScale(2, RoundingMode.HALF_UP).doubleValue());
            food.setNumberRating(numberOfRatings);
            foodRepository.save(food);

        } catch (Exception ex) {
           
            throw ex;
        }
    }

}