package com.foodapp.controller;

import com.foodapp.dto.CreateFoodTypeDto;
import com.foodapp.dto.FoodTypeResponseDto;
import com.foodapp.model.Food;
import com.foodapp.model.FoodType;
import com.foodapp.repository.FoodRepository;
import com.foodapp.repository.FoodTypeRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final FoodTypeRepository foodTypeRepository;
    private final FoodRepository foodRepository;

    public CategoryController(FoodTypeRepository foodTypeRepository, FoodRepository foodRepository) {
        this.foodTypeRepository = foodTypeRepository;
        this.foodRepository = foodRepository;
    }

    @GetMapping("/getAllFoodTypes")
    public ResponseEntity<?> getAllFoodTypes() {
        List<FoodTypeResponseDto> foodTypes = foodTypeRepository.findAll().stream()
            .map(ft -> {
                long totalFood = foodRepository.findAll().stream()
                    .filter(f -> f.getFoodType().getTypeId().equals(ft.getTypeId()) ||
                        (f.getFoodType().getParentId() != null && f.getFoodType().getParentId().equals(ft.getTypeId())))
                    .count();

                return FoodTypeResponseDto.of(
                    ft.getTypeId(),
                    ft.getNameType(),
                    ft.getParentId(),
                    totalFood
                );
            })
            .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", foodTypes);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getFoodTypeById/{id}")
    public ResponseEntity<?> getFoodTypeById(@PathVariable Long id) {
        return foodTypeRepository.findById(id)
            .map(ft -> {
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("data", FoodTypeResponseDto.of(
                    ft.getTypeId(),
                    ft.getNameType(),
                    ft.getParentId(),
                    0L
                ));
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/addType")
    public ResponseEntity<?> addNewType(@Valid @RequestBody CreateFoodTypeDto createFoodTypeDto) {
        if (createFoodTypeDto.nameType == null || createFoodTypeDto.nameType.trim().isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Error");
            return ResponseEntity.badRequest().body(response);
        }

        if (createFoodTypeDto.parentId != null) {
            foodTypeRepository.findById(createFoodTypeDto.parentId)
                .ifPresent(parent -> {
                    if (parent.getParentId() != null && parent.getParentId() != 0) {
                        throw new IllegalArgumentException("Parent type is a child type.");
                    }
                });
        }

        FoodType foodType = new FoodType();
        foodType.setNameType(createFoodTypeDto.nameType.trim());
        foodType.setParentId(createFoodTypeDto.parentId);

        FoodType savedType = foodTypeRepository.save(foodType);
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", FoodTypeResponseDto.of(
            savedType.getTypeId(),
            savedType.getNameType(),
            savedType.getParentId(),
            0L
        ));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{typeId}")
    public ResponseEntity<?> deleteFoodType(@PathVariable Long typeId) {
        return foodTypeRepository.findById(typeId)
            .map(foodType -> {
                List<FoodType> childTypes = foodTypeRepository.findAll().stream()
                    .filter(ft -> ft.getParentId() != null && ft.getParentId().equals(typeId))
                    .collect(Collectors.toList());
                
                foodTypeRepository.deleteAll(childTypes);
                foodTypeRepository.delete(foodType);

                Map<String, String> response = new HashMap<>();
                response.put("status", "success");
                response.put("message", "Food type deleted successfully.");
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFoodType(@PathVariable Long id, @Valid @RequestBody CreateFoodTypeDto updateFoodTypeDto) {
        if (updateFoodTypeDto.nameType == null || updateFoodTypeDto.nameType.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid food type data.");
        }

        return foodTypeRepository.findById(id)
            .map(foodType -> {
                if (updateFoodTypeDto.parentId != null) {
                    foodTypeRepository.findById(updateFoodTypeDto.parentId)
                        .ifPresent(parent -> {
                            if (parent.getParentId() != null && parent.getParentId() != 0) {
                                throw new IllegalArgumentException("Parent type is a child type.");
                            }
                        });
                }

                foodType.setNameType(updateFoodTypeDto.nameType.trim());
                foodType.setParentId(updateFoodTypeDto.parentId);

                FoodType updatedType = foodTypeRepository.save(foodType);
                
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("data", FoodTypeResponseDto.of(
                    updatedType.getTypeId(),
                    updatedType.getNameType(),
                    updatedType.getParentId(),
                    0L
                ));
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}