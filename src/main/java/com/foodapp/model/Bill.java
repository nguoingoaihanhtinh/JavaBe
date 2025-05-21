package com.foodapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
public class Bill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long billId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    public User user;
    
    @Column(nullable = false)
    public String address;
    
    @Column(nullable = false)
    public String phone;
    
    @Column(nullable = false)
    public BigDecimal total;
    
    @Column(nullable = false)
    public String status;
    
    @Column(name = "created_at", nullable = false)
    public LocalDateTime createdAt;
}