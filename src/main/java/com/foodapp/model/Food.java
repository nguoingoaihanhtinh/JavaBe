package com.foodapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "food")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String image1;
    
    private String image2;
    private String image3;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    @Column(nullable = false)
    private Integer itemleft;
    
    private Double rating;
    private Integer numberRating;
    
    @Column(length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_type_id")
    private FoodType foodType;
    
    @OneToMany(mappedBy = "food")
    private Set<Rating> ratings;
    
    @OneToMany(mappedBy = "food")
    private Set<UserFoodSaved> savedUsers;
    
    @OneToMany(mappedBy = "food")
    private Set<UserFoodOrder> orders;

    public Long getFoodId() { return foodId; }
    public void setFoodId(Long foodId) { this.foodId = foodId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getImage1() { return image1; }
    public void setImage1(String image1) { this.image1 = image1; }
    
    public String getImage2() { return image2; }
    public void setImage2(String image2) { this.image2 = image2; }
    
    public String getImage3() { return image3; }
    public void setImage3(String image3) { this.image3 = image3; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public Integer getItemleft() { return itemleft; }
    public void setItemleft(Integer itemleft) { this.itemleft = itemleft; }
    
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    
    public Integer getNumberRating() { return numberRating; }
    public void setNumberRating(Integer numberRating) { this.numberRating = numberRating; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public FoodType getFoodType() { return foodType; }
    public void setFoodType(FoodType foodType) { this.foodType = foodType; }
    
    public Set<Rating> getRatings() { return ratings; }
    public void setRatings(Set<Rating> ratings) { this.ratings = ratings; }
    
    public Set<UserFoodSaved> getSavedUsers() { return savedUsers; }
    public void setSavedUsers(Set<UserFoodSaved> savedUsers) { this.savedUsers = savedUsers; }
    
    public Set<UserFoodOrder> getOrders() { return orders; }
    public void setOrders(Set<UserFoodOrder> orders) { this.orders = orders; }
}
