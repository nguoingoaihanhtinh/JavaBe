package com.foodapp.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "food_types")
public class FoodType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeId;

    @Column(nullable = false, unique = true)
    private String nameType;

    private Long parentId;

    @OneToMany(mappedBy = "foodType", cascade = CascadeType.ALL)
    private Set<Food> foods;

    public Long getTypeId() { return typeId; }
    public void setTypeId(Long typeId) { this.typeId = typeId; }

    public String getNameType() { return nameType; }
    public void setNameType(String nameType) { this.nameType = nameType; }

    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    public Set<Food> getFoods() { return foods; }
    public void setFoods(Set<Food> foods) { this.foods = foods; }
}
