package com.foodapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "food")
@Getter
@Setter
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long foodId;

    public String name;
    public String image1;
    public String image2;
    public String image3;
    public Double price;
    public Integer itemleft;
    public Double rating;
    public Integer numberRating;
    public String description;

    @ManyToOne
    @JoinColumn(name = "food_type_id") // Name of the FK column in the Food table
    public FoodType foodType;
}
