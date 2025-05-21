package com.foodapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.foodapp.controller",
    "com.foodapp.config",
    "com.foodapp.repository"
})
@EntityScan("com.foodapp.model")
@EnableJpaRepositories("com.foodapp.repository")
public class FoodAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodAppApplication.class, args);
    }
}