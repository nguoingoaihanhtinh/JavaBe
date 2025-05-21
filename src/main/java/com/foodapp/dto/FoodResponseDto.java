package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class FoodResponseDto {
    public Long foodId;
    public String name;
    public String image1;
    public String image2;
    public String image3;
    public BigDecimal price;
    public Integer itemleft;
    public Double rating;
    public Integer numberRating;
    public String description;
    public FoodTypeDto foodType;

    @Getter
    @Setter
    public static class FoodTypeDto {
        public Long typeId;
        public String nameType;
    }
}