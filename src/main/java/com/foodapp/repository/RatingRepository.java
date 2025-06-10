package com.foodapp.repository;

import com.foodapp.model.Rating;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    long countByFood_FoodId(Long foodId);
    int countByUser_UserId(int userId);


    @Query("SELECT r FROM Rating r JOIN FETCH r.user WHERE r.food.foodId = :foodId")
    List<Rating> findByFoodIdWithUser(@Param("foodId") int foodId, Pageable pageable);

    List<Rating> findByFood_FoodId(Long foodId);

    @Query("SELECT r FROM Rating r JOIN FETCH r.food WHERE r.user.userId = :userId")
    List<Rating> findByUserId(@Param("userId") int userId, Pageable pageable);
}
