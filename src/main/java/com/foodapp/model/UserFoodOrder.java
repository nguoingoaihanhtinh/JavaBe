package com.foodapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_food_orders")
public class UserFoodOrder {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    
    @Column(nullable = false)
    private Integer quantity;
    
    private String note;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Food getFood() { return food; }
    public void setFood(Food food) { this.food = food; }
}