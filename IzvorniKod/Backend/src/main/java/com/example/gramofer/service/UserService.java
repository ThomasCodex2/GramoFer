package com.example.gramofer.service;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.responses.UserResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepo userrepo;

    public UserService(UserRepo userrepo) {
        this.userrepo = userrepo;

    }

    public List<UserResponse> getAllUsers() {
    List<UserAccount> allusers = userrepo.findAll();
    return allusers.stream()
        .map(UserAccount -> {
            UserResponse dto = new UserResponse();
            dto.setUserId(UserAccount.getUserId());
            dto.setEmail(UserAccount.getEmail());
            dto.setFirstName(UserAccount.getFirstName());
            dto.setLastName(UserAccount.getLastName());
            dto.setRegistrationDate(UserAccount.getRegistrationDate());
            dto.setUsername(UserAccount.getUsername());
            return dto;
        })
        .collect(Collectors.toList());
    }

    public ResponseEntity<?> deleteUserById(Integer id) {
        if (!userrepo.existsById(id)) {
            return ResponseEntity.status(404).body("User not found");
        }

        userrepo.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
