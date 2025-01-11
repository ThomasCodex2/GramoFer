package com.example.gramofer.contoller;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public List<UserAccount> getUsers() {
        return userService.fetchUsers();
    }

    @PostMapping("/user")
    public void addUser(@RequestBody UserAccount userAccount) {
        //System.out.println(userAccount);
        userService.saveUser(userAccount);
    }
}
