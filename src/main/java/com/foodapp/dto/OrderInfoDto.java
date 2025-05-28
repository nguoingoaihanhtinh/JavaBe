package com.foodapp.dto;

public class OrderInfoDto {
    private Long orderId;
    private Long foodId;
    private Integer quantity;
    private String note;
    private FoodDetailsDto foodDetails;
    
    // Getters and Setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    
    public Long getFoodId() { return foodId; }
    public void setFoodId(Long foodId) { this.foodId = foodId; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    
    public FoodDetailsDto getFoodDetails() { return foodDetails; }
    public void setFoodDetails(FoodDetailsDto foodDetails) { this.foodDetails = foodDetails; }
    
    public static class FoodDetailsDto {
        private Long typeId;
        private String name;
        private String description;
        private String image1;
        private Double price;
        
        // Getters and Setters
        public Long getTypeId() { return typeId; }
        public void setTypeId(Long typeId) { this.typeId = typeId; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getImage1() { return image1; }
        public void setImage1(String image1) { this.image1 = image1; }
        
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
    }
}