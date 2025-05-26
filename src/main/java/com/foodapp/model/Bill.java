package com.foodapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;

    @Column(nullable = false)
    private Long totalPrice;

    @Column(nullable = false)
    private String address;

    @Column(columnDefinition = "LONGTEXT")
    private String foodInfo;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private String status;

    public Long getBillId() { return billId; }
    public void setBillId(Long billId) { this.billId = billId; }

    public Long getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Long totalPrice) { this.totalPrice = totalPrice; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getFoodInfo() { return foodInfo; }
    public void setFoodInfo(String foodInfo) { this.foodInfo = foodInfo; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}