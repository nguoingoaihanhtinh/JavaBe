package com.foodapp.repository;

import com.foodapp.model.UserFoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFoodOrderRepository extends JpaRepository<UserFoodOrder, Long> {
    // Fetch all UserFoodOrder entities for a given userId
    List<UserFoodOrder> findByUserUserId(Long userId);
}