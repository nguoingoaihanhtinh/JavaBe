package com.foodapp.controller;

import com.foodapp.dto.CreateFoodDto;
import java.util.Map;
import java.math.BigDecimal;
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
@RequestMapping("/Food")
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

    @GetMapping("/Newest")
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

    @GetMapping("/getfood")
    public ResponseEntity<?> getFoodById(@RequestParam("id") Long id) {
        Food food = foodRepository.findByIdWithRelationships(id);
        
        if (food == null) {
            return ResponseEntity.ok(Map.of(
                "status", "error",
                "message", "Food not found"
            ));
        }

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "data", mapToFoodResponse(food)
        ));
    }

    @GetMapping("/Search")
    public ResponseEntity<?> searchFood(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String kw) {

        Page<Food> foodPage = foodRepository.findByNameContainingIgnoreCase(
            kw == null ? "" : kw.trim(),
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

    @PostMapping("/addFood")
    public ResponseEntity<?> addFood(@RequestBody Map<String, Object> createFoodDto) {
        FoodType foodType = foodTypeRepository.findById(Long.parseLong(createFoodDto.get("TypeId").toString()))
            .orElseThrow(() -> new IllegalArgumentException("Food type not found"));

        Food food = new Food();
        food.setName(createFoodDto.get("Name").toString().trim());
        food.setImage1(createFoodDto.get("Image1").toString());
        food.setImage2(createFoodDto.get("Image2").toString());
        food.setImage3(createFoodDto.get("Image3").toString());
        food.setDescription(createFoodDto.get("Description").toString());
        food.setPrice(new BigDecimal(createFoodDto.get("Price").toString()));
        food.setItemleft(Integer.parseInt(createFoodDto.get("Itemleft").toString()));
        food.setFoodType(foodType);
        food.setRating(0.0);
        food.setNumberRating(0);

        Food savedFood = foodRepository.save(food);
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "data", mapToFoodResponse(savedFood)
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFood(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updateFoodDto) {
        
        Food existingFood = foodRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Food not found"));

        FoodType foodType = foodTypeRepository.findById(Long.parseLong(updateFoodDto.get("TypeId").toString()))
            .orElseThrow(() -> new IllegalArgumentException("Food type not found"));

        existingFood.setName(updateFoodDto.get("Name").toString().trim());
        existingFood.setImage1(updateFoodDto.get("Image1").toString());
        existingFood.setImage2(updateFoodDto.get("Image2").toString());
        existingFood.setImage3(updateFoodDto.get("Image3").toString());
        existingFood.setDescription(updateFoodDto.get("Description").toString());
        existingFood.setPrice(new BigDecimal(updateFoodDto.get("Price").toString()));
        existingFood.setItemleft(Integer.parseInt(updateFoodDto.get("Itemleft").toString()));
        existingFood.setFoodType(foodType);

        Food updatedFood = foodRepository.save(existingFood);
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "data", mapToFoodResponse(updatedFood)
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) {
        if (!foodRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        foodRepository.deleteById(id);
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Food deleted successfully"
        ));
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