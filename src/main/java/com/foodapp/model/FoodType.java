package com.foodapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import com.foodapp.model.Food;

@Entity
@Table(name = "food_types")
@Getter
@Setter
public class FoodType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public  Long typeId;

    @Column(nullable = false, unique = true)
    public  String nameType;

    @OneToMany(mappedBy = "foodType", cascade = CascadeType.ALL)
    public  Set<Food> foods;
}
