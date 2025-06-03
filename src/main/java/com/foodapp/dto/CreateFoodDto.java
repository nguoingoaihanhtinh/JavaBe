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
    public String Name;

    @NotBlank(message = "Primary image is required")
    public String Image1;
    
    public String Image2;
    public String Image3;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be greater than or equal to 0")
    public BigDecimal Price;

    @NotNull(message = "Items left is required")
    @Min(value = 0, message = "Items left must be greater than or equal to 0")
    public Integer Itemleft;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    public String Description;

    @NotNull(message = "Food type ID is required")
    public Long TypeId;
}