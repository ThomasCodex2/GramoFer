package com.example.gramofer.contoller;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<UserAccount> getUsers() {
        return userService.fetchUsers();
    }

    @PostMapping("/users")
    public void addUser(@RequestBody UserAccount userAccount) {
        userService.saveUser(userAccount);
    }
}
