package com.foodapp.controller;

import com.foodapp.dto.CreateFoodDto;
import com.foodapp.dto.FoodResponseDto;
import com.foodapp.dto.PaginationDto;
import com.foodapp.model.Food;
import com.foodapp.model.FoodType;
import com.foodapp.repository.FoodRepository;
import com.foodapp.repository.FoodTypeRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/food")
public class FoodController {

    private final FoodRepository foodRepository;
    private final FoodTypeRepository foodTypeRepository;

    public FoodController(FoodRepository foodRepository, FoodTypeRepository foodTypeRepository) {
        this.foodRepository = foodRepository;
        this.foodTypeRepository = foodTypeRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllFood(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String type) {
        
        if (page <= 0 || limit <= 0) {
            PaginationDto<FoodResponseDto> errorResponse = new PaginationDto<>();
            errorResponse.status = "error";
            return ResponseEntity.badRequest().body(errorResponse);
        }

        PageRequest pageRequest = PageRequest.of(page - 1, limit);
        Page<Food> foodPage;

        if (type != null && !type.trim().isEmpty()) {
            foodPage = foodRepository.findByFoodTypeName(type.trim(), pageRequest);
        } else {
            foodPage = foodRepository.findAll(pageRequest);
        }

        List<FoodResponseDto> foodDtos = foodPage.getContent().stream()
            .map(this::mapToFoodResponse)
            .collect(Collectors.toList());

        return ResponseEntity.ok(PaginationDto.of(
            foodDtos, 
            page, 
            limit, 
            foodPage.getTotalElements()
        ));
    }

    @GetMapping("/newest")
    public ResponseEntity<?> getNewestFood(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        Page<Food> foodPage = foodRepository.findAll(
            PageRequest.of(page - 1, limit, Sort.by("foodId").descending())
        );

        List<FoodResponseDto> foodDtos = foodPage.getContent().stream()
            .map(this::mapToFoodResponse)
            .collect(Collectors.toList());

        return ResponseEntity.ok(PaginationDto.of(
            foodDtos, 
            page, 
            limit, 
            foodPage.getTotalElements()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFoodById(@PathVariable Long id) {
        Food food = foodRepository.findByIdWithRelationships(id);
        
        if (food == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(mapToFoodResponse(food));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchFood(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String keyword) {

        Page<Food> foodPage = foodRepository.findByNameContainingIgnoreCase(
            keyword == null ? "" : keyword.trim(),
            PageRequest.of(page - 1, limit, Sort.by("foodId").descending())
        );

        List<FoodResponseDto> foodDtos = foodPage.getContent().stream()
            .map(this::mapToFoodResponse)
            .collect(Collectors.toList());

        return ResponseEntity.ok(PaginationDto.of(
            foodDtos, 
            page, 
            limit, 
            foodPage.getTotalElements()
        ));
    }

    @PostMapping
    public ResponseEntity<?> addFood(@Valid @RequestBody CreateFoodDto createFoodDto) {
        FoodType foodType = foodTypeRepository.findById(createFoodDto.foodTypeId)
            .orElseThrow(() -> new IllegalArgumentException("Food type not found"));

        Food food = new Food();
        food.setName(createFoodDto.name.trim());
        food.setImage1(createFoodDto.image1);
        food.setImage2(createFoodDto.image2);
        food.setImage3(createFoodDto.image3);
        food.setDescription(createFoodDto.description);
        food.setPrice(createFoodDto.price);
        food.setItemleft(createFoodDto.itemleft);
        food.setFoodType(foodType);
        food.setRating(0.0);
        food.setNumberRating(0);

        Food savedFood = foodRepository.save(food);
        return ResponseEntity.ok(mapToFoodResponse(savedFood));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFood(
            @PathVariable Long id,
            @Valid @RequestBody CreateFoodDto updateFoodDto) {
        
        Food existingFood = foodRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Food not found"));

        FoodType foodType = foodTypeRepository.findById(updateFoodDto.foodTypeId)
            .orElseThrow(() -> new IllegalArgumentException("Food type not found"));

        existingFood.setName(updateFoodDto.name.trim());
        existingFood.setImage1(updateFoodDto.image1);
        existingFood.setImage2(updateFoodDto.image2);
        existingFood.setImage3(updateFoodDto.image3);
        existingFood.setDescription(updateFoodDto.description);
        existingFood.setPrice(updateFoodDto.price);
        existingFood.setItemleft(updateFoodDto.itemleft);
        existingFood.setFoodType(foodType);

        Food updatedFood = foodRepository.save(existingFood);
        return ResponseEntity.ok(mapToFoodResponse(updatedFood));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) {
        if (!foodRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        foodRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    private FoodResponseDto mapToFoodResponse(Food food) {
        FoodResponseDto dto = new FoodResponseDto();
        dto.foodId = food.getFoodId();
        dto.name = food.getName();
        dto.image1 = food.getImage1();
        dto.image2 = food.getImage2();
        dto.image3 = food.getImage3();
        dto.price = food.getPrice();
        dto.itemleft = food.getItemleft();
        dto.rating = food.getRating();
        dto.numberRating = food.getNumberRating();
        dto.description = food.getDescription();

        FoodResponseDto.FoodTypeDto foodTypeDto = new FoodResponseDto.FoodTypeDto();
        foodTypeDto.typeId = food.getFoodType().getTypeId();
        foodTypeDto.nameType = food.getFoodType().getNameType();
        dto.foodType = foodTypeDto;

        return dto;
    }
}