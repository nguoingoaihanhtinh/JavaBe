package com.foodapp.repository;

import com.foodapp.model.UserFoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFoodOrderRepository extends JpaRepository<UserFoodOrder, Long> {
}