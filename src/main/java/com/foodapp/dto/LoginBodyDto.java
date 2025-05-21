package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginBodyDto {
    public String email;
    public String password;
}