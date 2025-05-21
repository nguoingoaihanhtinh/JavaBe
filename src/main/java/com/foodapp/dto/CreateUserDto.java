package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserDto {
    public String firstName;
    public String lastName;
    public String email;
    public String password;
    public String passwordConfirm;
}