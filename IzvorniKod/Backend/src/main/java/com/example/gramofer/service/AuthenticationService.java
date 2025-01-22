package com.example.gramofer.service;

import com.example.gramofer.dtos.LoginUserDto;
import com.example.gramofer.dtos.OAuthDto;
import com.example.gramofer.dtos.RegisterUserDto;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.repo.UserRepo;

import java.time.LocalDate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.xbill.DNS.Lookup;
import org.xbill.DNS.Type;
import org.xbill.DNS.Record;


@Service
public class AuthenticationService {
    private final UserRepo userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepo userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        
    }

    private UserAccount newOauthUser(OAuthDto input) {
        UserAccount user = new UserAccount();
        user.setFirstName(input.getFirstname());
        user.setLastName(input.getLastname());
        if (isDomainValid(input.getEmail())) {
            user.setEmail(input.getEmail());
        }
        else {
            return null;
        } 
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(Math.random()+""));
        user.setUsername(input.getEmail());
        if (input.getEmail().equals("tomislav.perakovic@gmail.com") || input.getEmail().equals("jurica0511@gmail.com")){
            user.setIsAdmin(1);
        }
        else {
            user.setIsAdmin(0);
        }
        user.setStrikeCount(0);
        user.setRegistrationDate(LocalDate.now());
        return userRepository.save(user);
    }
    
    public UserAccount getOauthUserAccount(OAuthDto user){
        return userRepository.findByEmail(user.getEmail())
                .orElseGet(() -> newOauthUser(user));
    }

    public UserAccount signup(RegisterUserDto input) {
        UserAccount user = new UserAccount();
        user.setFirstName(input.getFirstname());
        user.setLastName(input.getLastname()); 
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setUsername(input.getEmail());
        user.setIsAdmin(0);
        user.setStrikeCount(0);
        user.setRegistrationDate(LocalDate.now());
        return userRepository.save(user);
    }

    public UserAccount authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }

    public static boolean isDomainValid(String email) {
        try {
            String domain = email.split("@")[1];
            Lookup lookup = new Lookup(domain, Type.MX);
            Record[] records = lookup.run();
            return records != null && records.length > 0;
        } catch (Exception e) {
            return false;
        }
    }
}