package com.foodapp.config;

import com.foodapp.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.ArrayList;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(UserDetailsService userDetailsService) {
        return new JwtAuthenticationFilter(userDetailsService);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // ✅ Disable CSRF since we are using stateless JWT authentication
            .csrf(csrf -> csrf.disable())

            // ✅ Enable CORS for frontend communication (React, etc.)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ✅ Set stateless session (no HTTP session will be created or used)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ✅ Define which requests are permitted without authentication
            .authorizeHttpRequests(auth ->
                auth
                    .requestMatchers("/user/register", "/user/login", "/user/checkjwt").permitAll()
                    .requestMatchers(HttpMethod.GET, "/Food/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/Category/**").permitAll()
                    // 🔒 Require authentication for these endpoints
                    .requestMatchers("/Rating/**").permitAll()
                    .requestMatchers("/Cart/**").permitAll()
                    .requestMatchers("/Bill/**").permitAll()
                    .requestMatchers("/User/**").permitAll()
                    .requestMatchers("/user/**").permitAll()

                    // 🔒 Any other request must be authenticated
                    .anyRequest().permitAll()
            )

            // ✅ Add JWT filter before the default UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthenticationFilter(userDetailsService()), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Adjust to match your frontend origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
            .map(user -> new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
            ))
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
