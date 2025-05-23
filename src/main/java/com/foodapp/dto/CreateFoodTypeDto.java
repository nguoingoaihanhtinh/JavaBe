
package com.foodapp.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateFoodTypeDto {
    @NotBlank(message = "Name type is required")
    @Size(min = 2, max = 100, message = "Name type must be between 2 and 100 characters")
    public String nameType;

    public Long parentId;
}