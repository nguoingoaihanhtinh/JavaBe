package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingBodyDto {
    private Long userId;
    private Long foodId;
    private String content;
    private int ratingValue;

}
