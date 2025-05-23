package com.foodapp.dto;

import jakarta.validation.constraints.NotNull;

public class CartRequestDto {
    @NotNull(message = "Order ID is required")
    public Long orderId;
}