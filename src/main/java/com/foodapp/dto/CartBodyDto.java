package com.foodapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CartBodyDto {
    @NotNull(message = "User ID is required")
    @Min(value = 1, message = "User ID must be greater than 0")
    private Integer userId;

    @NotNull(message = "Food ID is required")
    @Min(value = 1, message = "Food ID must be greater than 0")
    private Integer foodId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be greater than 0")
    private Integer quantity;

    private String note;

    public Long getUserId() {
        return userId != null ? userId.longValue() : null;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getFoodId() {
        return foodId != null ? foodId.longValue() : null;
    }

    public void setFoodId(Integer foodId) {
        this.foodId = foodId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}