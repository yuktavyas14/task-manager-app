package com.yukta.authservice.service;


import com.yukta.authservice.dto.AuthResponse;
import com.yukta.authservice.dto.LoginRequest;
import com.yukta.authservice.dto.RegisterRequest;
import com.yukta.authservice.entity.User;
import com.yukta.authservice.repository.UserRepository;
import com.yukta.authservice.utils.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository
                .findByUsernameIgnoreCase(request.getUsername());
        boolean valid =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );
        if (!valid) {
            throw new RuntimeException(
                    "Invalid Credentials"
            );
        }

        String token =
                jwtUtils.generateToken(
                        user.getEmail()
                );

        return new AuthResponse(token);
    }
}
