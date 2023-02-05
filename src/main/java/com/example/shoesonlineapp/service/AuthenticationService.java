package com.example.shoesonlineapp.service;


import com.example.shoesonlineapp.controller.AuthenticationRequest;
import com.example.shoesonlineapp.controller.AuthenticationResponse;
import com.example.shoesonlineapp.controller.RegisterRequest;
import com.example.shoesonlineapp.entity.Role;
import com.example.shoesonlineapp.entity.User;
import com.example.shoesonlineapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {

        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if(existingUser.isPresent()) {
            throw new IllegalArgumentException("User with email '" + request.getEmail() +"' already exists");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }
}
