package com.foodapp.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class CreateFoodDto {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    public String name;

    @NotBlank(message = "Primary image is required")
    public String image1;
    
    public String image2;
    public String image3;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be greater than or equal to 0")
    public BigDecimal price;

    @NotNull(message = "Items left is required")
    @Min(value = 0, message = "Items left must be greater than or equal to 0")
    public Integer itemleft;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    public String description;

    @NotNull(message = "Food type ID is required")
    public Long foodTypeId;
}