package com.foodapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodapp.model.UserFoodSaved;

@Repository
public interface UserFoodSavedRepository extends JpaRepository<UserFoodSaved, Long> {
    Optional<UserFoodSaved> findByUser_UserIdAndFood_FoodId(Long userId, Long foodId);
    Page<UserFoodSaved> findByUser_UserId(Long userId, Pageable pageable);
    List<UserFoodSaved> findByUser_UserId(Long userId); // Non-paginated method
}