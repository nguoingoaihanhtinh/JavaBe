package com.foodapp.repository;

import com.foodapp.model.Notification;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    long countByUser_UserId(int userId);

    List<Notification> findByUserUserIdOrderByDateDesc(Long userId);
    List<Notification> findByUser_UserId(int userId, Pageable pageable);
}