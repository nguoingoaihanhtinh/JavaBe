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
    private Long totalPrice;
    
    private String foodInfo;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public Long getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Long totalPrice) { this.totalPrice = totalPrice; }
    
    public String getFoodInfo() { return foodInfo; }
    public void setFoodInfo(String foodInfo) { this.foodInfo = foodInfo; }
}