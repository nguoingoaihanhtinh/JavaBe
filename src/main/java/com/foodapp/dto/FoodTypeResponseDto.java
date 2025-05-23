package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodTypeResponseDto {
    public Long typeId;
    public String nameType;
    public Long parentId;
    public Long totalFood;

    public static FoodTypeResponseDto of(Long typeId, String nameType, Long parentId, Long totalFood) {
        FoodTypeResponseDto dto = new FoodTypeResponseDto();
        dto.typeId = typeId;
        dto.nameType = nameType;
        dto.parentId = parentId;
        dto.totalFood = totalFood;
        return dto;
    }
}