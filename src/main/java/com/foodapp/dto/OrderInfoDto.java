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
        private Long foodId;
        private String name;
        private String description;
        private String image1;
        private String image2;
        private String image3;
        private Double price;
        private Integer itemleft;
        private Double rating;
        private Integer numberRating;
        private FoodTypeDto foodType;
        
        // Getters and Setters
        public Long getFoodId() { return foodId; }
        public void setFoodId(Long foodId) { this.foodId = foodId; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getImage1() { return image1; }
        public void setImage1(String image1) { this.image1 = image1; }
        
        public String getImage2() { return image2; }
        public void setImage2(String image2) { this.image2 = image2; }
        
        public String getImage3() { return image3; }
        public void setImage3(String image3) { this.image3 = image3; }
        
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
        
        public Integer getItemleft() { return itemleft; }
        public void setItemleft(Integer itemleft) { this.itemleft = itemleft; }
        
        public Double getRating() { return rating; }
        public void setRating(Double rating) { this.rating = rating; }
        
        public Integer getNumberRating() { return numberRating; }
        public void setNumberRating(Integer numberRating) { this.numberRating = numberRating; }
        
        public FoodTypeDto getFoodType() { return foodType; }
        public void setFoodType(FoodTypeDto foodType) { this.foodType = foodType; }
    }
    
    public static class FoodTypeDto {
        private Long typeId;
        private String nameType;
        
        public Long getTypeId() { return typeId; }
        public void setTypeId(Long typeId) { this.typeId = typeId; }
        
        public String getNameType() { return nameType; }
        public void setNameType(String nameType) { this.nameType = nameType; }
    }
}