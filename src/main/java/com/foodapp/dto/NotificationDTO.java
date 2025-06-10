package com.foodapp.dto;

import java.time.LocalDateTime;

import com.foodapp.model.Notification;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDTO {
    private Long id;
    private String header;
    private String content;
    private LocalDateTime date;
    private String userName; 

    // Constructor
    public NotificationDTO(Notification noti) {
        this.id = noti.getNotiId();
        this.header = noti.getHeader();
        this.content = noti.getContent();
        this.date = noti.getDate();
        this.userName = noti.getUser().getUsername(); 
    }
}
