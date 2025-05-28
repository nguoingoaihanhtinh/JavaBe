package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRatingDto {
    private Long ratingId;
    private String content;
    private int ratingValue;
}
