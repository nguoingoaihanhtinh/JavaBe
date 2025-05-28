package com.foodapp.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

public class BillRequestDto {
    @NotNull
    @Min(1)
    private Long userId;

    @NotNull
    private String address;

    @NotNull
    @Min(0)
    private Long totalPrice;

    @NotNull
    private String foodInfo;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getAddress() {
        if (address != null && address.startsWith("\"") && address.endsWith("\"")) {
            return address.substring(1, address.length() - 1).replace("\\\"", "\"");
        }
        return address;
    }
    public void setAddress(String address) { this.address = address; }

    public Long getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Long totalPrice) { this.totalPrice = totalPrice; }

    public String getFoodInfo() {
        if (foodInfo != null && foodInfo.startsWith("\"") && foodInfo.endsWith("\"")) {
            // Remove outer quotes and unescape inner content
            return foodInfo.substring(1, foodInfo.length() - 1).replace("\\\"", "\"");
        }
        return foodInfo;
    }
    public void setFoodInfo(String foodInfo) { this.foodInfo = foodInfo; }
}