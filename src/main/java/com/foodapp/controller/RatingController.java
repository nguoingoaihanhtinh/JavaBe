package com.foodapp.controller;

import java.util.Map;
import java.math.BigDecimal;
import com.foodapp.dto.PaginationDto;
import com.foodapp.repository.RatingRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Rating")
public class RatingController {

    private final RatingRepository ratingRepository;

    public RatingController(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
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

}