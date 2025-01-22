package com.example.gramofer.contoller;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.responses.UserResponse;
import com.example.gramofer.responses.VinylResponseDTO;
import com.example.gramofer.service.UserService;
import com.example.gramofer.service.VinylService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admintable")
public class AdminController {
    private final UserService userService;
    private final VinylService vinylService;

    public AdminController(UserService userService, VinylService vinylService) {
        this.userService = userService;
        this.vinylService = vinylService;
    }

    @GetMapping("/users")
    public List<UserResponse> getUsers(@AuthenticationPrincipal UserAccount user) {
        if (user.getIsAdmin() == 1) {
            return userService.getAllUsers();
        }
        return null;
    }

    @GetMapping("/allvinyls")
    public List<VinylResponseDTO> getVinyls(@AuthenticationPrincipal UserAccount user) {
        if (user.getIsAdmin() == 1) {
            return vinylService.getAllVinyls();
        }
        return null;
    }

    @DeleteMapping("/vinyl/{id}")
    public ResponseEntity<?> deleteVinyl(@PathVariable Integer id, @AuthenticationPrincipal UserAccount user) {
        if (user.getIsAdmin() == 1) {
            return vinylService.deleteVinylById(id);
        }
        return null;
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id, @AuthenticationPrincipal UserAccount user) {
        if (user.getIsAdmin() == 1) {
            return userService.deleteUserById(id);
        }
        return null;
    }

    @GetMapping("/admin")
    public Integer getadmin(@AuthenticationPrincipal UserAccount user) {
        return userService.getifadmin(user);
    }
}
