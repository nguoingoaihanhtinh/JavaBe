package com.foodapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notiId;
    
    @Column(nullable = false)
    private String header;
    
    @Column(nullable = false)
    private String content;
    
    @Column(nullable = false)
    private LocalDateTime date;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and Setters
    public Long getNotiId() { return notiId; }
    public void setNotiId(Long notiId) { this.notiId = notiId; }
    
    public String getHeader() { return header; }
    public void setHeader(String header) { this.header = header; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}