package com.foodapp.controller;
import com.foodapp.model.Notification;
import com.foodapp.repository.NotificationRepository;
import com.foodapp.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Noti")
public class NotiController {

    private final UserRepository userRepository;
    private final NotificationRepository notiRepository;


    public NotiController(UserRepository userRepository, NotificationRepository notiRepository) {
        this.userRepository = userRepository;
        this.notiRepository = notiRepository;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllNoti(@RequestParam(defaultValue = "1") int page,
                                        @RequestParam(defaultValue = "10") int limit) {

        if (page <= 0 || limit <= 0) {
            return ResponseEntity.badRequest().body("Page and limit must be greater than zero.");
        }

        long totalItems = notiRepository.count();
        int totalPages = (int) Math.ceil((double) totalItems / limit);

        List<Notification> notifications = notiRepository.findAll(
                PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "date"))
        ).getContent();

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", notifications);

        Map<String, Object> pagination = new HashMap<>();
        pagination.put("currentPage", page);
        pagination.put("pageSize", limit);
        pagination.put("totalItems", totalItems);
        pagination.put("totalPages", totalPages);

        response.put("pagination", pagination);

        return ResponseEntity.ok(response);
    }
}   