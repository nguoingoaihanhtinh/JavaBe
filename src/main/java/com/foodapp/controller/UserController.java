package com.foodapp.controller;

import com.foodapp.dto.*;
import com.foodapp.model.*;
import com.foodapp.repository.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final UserFoodSavedRepository userFoodSavedRepository;
    private final FoodRepository foodRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public UserController(
            UserRepository userRepository,
            UserFoodSavedRepository userFoodSavedRepository,
            FoodRepository foodRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userFoodSavedRepository = userFoodSavedRepository;
        this.foodRepository = foodRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody CreateUserDto newUser, HttpServletResponse response) {
        if (!newUser.password.equals(newUser.passwordConfirm)) {
            return ResponseEntity.ok(Map.of(
                "status", "failed",
                "message", "Password and confirmation password do not match."
            ));
        }

        if (userRepository.findByEmail(newUser.email).isPresent()) {
            return ResponseEntity.ok(Map.of(
                "status", "failed",
                "message", "Email has been used!"
            ));
        }

        User user = new User();
        user.setUsername(newUser.firstName + " " + newUser.lastName);
        user.setEmail(newUser.email);
        user.setPassword(passwordEncoder.encode(newUser.password));
        user.setAddress("");
        user.setAvatar("https://shopcartimg2.blob.core.windows.net/shopcartctn/avatar3d.jpg");

        userRepository.save(user);

        String token = generateToken(user);
        setJwtCookie(token, response);

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Register successfully"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginBodyDto loginBody, HttpServletResponse response) {
        User user = userRepository.findByEmail(loginBody.email)
            .orElse(null);

        if (user == null || !passwordEncoder.matches(loginBody.password, user.getPassword())) {
            return ResponseEntity.ok(Map.of(
                "status", "failed",
                "message", "Invalid email or password."
            ));
        }

        String token = generateToken(user);
        setJwtCookie(token, response);

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Login successfully"
        ));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Logged out successfully."
        ));
    }

    @PostMapping("/removeFoodSaved")
    public ResponseEntity<?> removeFoodSaved(@RequestBody UserFoodDto userFood) {
        var savedFood = userFoodSavedRepository
            .findByUser_UserIdAndFood_FoodId(userFood.userId, userFood.foodId)
            .orElse(null);

        if (savedFood == null) {
            return ResponseEntity.notFound().build();
        }

        userFoodSavedRepository.delete(savedFood);
        return ResponseEntity.ok(Map.of(
            "message", "Food item removed from saved foods successfully."
        ));
    }

    @PostMapping("/addFoodSaved")
    public ResponseEntity<?> addFoodSaved(@RequestBody UserFoodDto userFood) {
        if (userFoodSavedRepository.findByUser_UserIdAndFood_FoodId(
                userFood.userId, userFood.foodId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("This food item is already saved for the user.");
        }

        User user = userRepository.findById(userFood.userId).orElseThrow();
        Food food = foodRepository.findById(userFood.foodId).orElseThrow();

        UserFoodSaved savedFood = new UserFoodSaved();
        savedFood.setUser(user);
        savedFood.setFood(food);
        userFoodSavedRepository.save(savedFood);

        return ResponseEntity.ok("Food item successfully saved for the user.");
    }

    @GetMapping("/getAllFoodSaved")
    public ResponseEntity<?> getAllFoodSaved(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        if (userId <= 0) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Invalid user ID."
            ));
        }

        PageRequest pageRequest = PageRequest.of(page - 1, limit);
        Page<UserFoodSaved> savedFoodsPage = userFoodSavedRepository.findByUser_UserId(userId, pageRequest);

        var savedFoods = savedFoodsPage.getContent().stream()
            .map(ufs -> Map.of(
                "foodId", ufs.getFood().getFoodId(),
                "foodName", ufs.getFood().getName(),
                "image1", ufs.getFood().getImage1(),
                "image2", ufs.getFood().getImage2(),
                "image3", ufs.getFood().getImage3(),
                "price", ufs.getFood().getPrice(),
                "itemleft", ufs.getFood().getItemleft(),
                "rating", ufs.getFood().getRating(),
                "numberRating", ufs.getFood().getNumberRating(),
                "description", ufs.getFood().getDescription()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "data", savedFoods,
            "pagination", Map.of(
                "currentPage", page,
                "pageSize", limit,
                "totalItems", savedFoodsPage.getTotalElements(),
                "totalPages", savedFoodsPage.getTotalPages()
            )
        ));
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserDto updateUser) {
        User user = userRepository.findById(updateUser.userId)
            .orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        user.setUsername(updateUser.username);
        user.setEmail(updateUser.email);
        user.setAddress(updateUser.address);

        if (updateUser.avatar != null && !updateUser.avatar.trim().isEmpty()) {
            user.setAvatar(updateUser.avatar);
        }

        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "User updated successfully."
        ));
    }

    private String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
            .setSubject(user.getEmail())
            .claim("id", user.getUserId().toString())
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS256)
            .compact();
    }

    private void setJwtCookie(String token, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (jwtExpiration / 1000));
        response.addCookie(cookie);
    }
}