package com.example.gramofer.responses;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserResponse {
    private Integer userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDate registrationDate;
}