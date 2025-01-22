package com.example.gramofer.contoller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gramofer.dtos.WishDto;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.responses.WishResponse;
import com.example.gramofer.service.WishService;

@RestController
@RequestMapping("/wishes")
public class WishController {
    
    private final WishService wservice;

    public WishController(WishService wservice) {
        this.wservice = wservice;
    }

    @GetMapping("/myWishes")
    public List<WishResponse> getVinylsByUsername(@AuthenticationPrincipal UserAccount user) {
        return wservice.getWishesByUser(user);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addWishes(@AuthenticationPrincipal UserAccount user, @RequestBody WishDto wishdto) {
        System.out.println("Dodavanje wish-a");
        System.out.println(user.getEmail());
        String zastavica = wservice.newWish(wishdto, user);
        if (zastavica == "uspjeh") {
        return ResponseEntity.status(HttpStatus.SC_CREATED).body("Wish added successfully.");
        }
        else {
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Wish already exists");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWish(@PathVariable Integer id, @AuthenticationPrincipal UserAccount user) {
        return wservice.deleteWishById(id);
    }
}
