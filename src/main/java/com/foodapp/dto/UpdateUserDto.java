package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDto {
    public Long userId;
    public String username;
    public String email;
    public String address;
    public String avatar;
}