package com.foodapp.repository;

import com.foodapp.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    
    // Find foods by type name with pagination
    @Query("SELECT f FROM Food f JOIN f.foodType ft WHERE ft.nameType = :type")
    Page<Food> findByFoodTypeName(@Param("type") String type, Pageable pageable);
    
    // Search foods by name containing keyword with pagination
    Page<Food> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
    
    // Get newest foods with pagination (already provided by JpaRepository's findAll with Sort)
    
    // Find food by id with all relationships loaded
    @Query("SELECT f FROM Food f " +
           "LEFT JOIN FETCH f.foodType " +
           "LEFT JOIN FETCH f.ratings " +
           "WHERE f.foodId = :id")
    Food findByIdWithRelationships(@Param("id") Long id);
}