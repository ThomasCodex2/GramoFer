package com.example.gramofer.contoller;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.dtos.LoginUserDto;
import com.example.gramofer.dtos.RegisterUserDto;
import com.example.gramofer.responses.LoginResponse;
import com.example.gramofer.service.AuthenticationService;
import com.example.gramofer.service.JWTService;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JWTService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JWTService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody RegisterUserDto registerUserDto) {
        UserAccount registeredUser = authenticationService.signup(registerUserDto);
        if (registeredUser == null) {
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Neispravan unos");
        }
        return ResponseEntity.status(HttpStatus.SC_ACCEPTED).body("Registracija uspješna.");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        UserAccount authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}