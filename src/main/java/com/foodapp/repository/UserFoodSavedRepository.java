package com.foodapp.repository;

import com.foodapp.model.UserFoodSaved;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserFoodSavedRepository extends JpaRepository<UserFoodSaved, Long> {
    Optional<UserFoodSaved> findByUser_UserIdAndFood_FoodId(Long userId, Long foodId);
    Page<UserFoodSaved> findByUser_UserId(Long userId, Pageable pageable);
}