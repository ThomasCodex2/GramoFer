package com.example.gramofer.contoller;

import com.example.gramofer.dtos.VinylDto;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.responses.VinylResponseDTO;
import com.example.gramofer.service.VinylService;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vinyls")
public class VinylController {

    private final VinylService service;

    public VinylController(VinylService service) {
        this.service = service;
    }

    // OVO TREBA PROMJENITI DA BUDE PRIKAZ SVIH PLOCA OD KORISNIKA
    @GetMapping("/vinyl")
    public List<VinylResponseDTO> getVinyls() {
        return service.getAllVinyls();
    }

    @GetMapping("/myVinyl")
    public List<Vinyl> getVinylsByUsername(@AuthenticationPrincipal UserAccount user) {
        return service.getVinylByUser(user);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addVinyl(@AuthenticationPrincipal UserAccount user, @RequestBody VinylDto vinyl) {
        System.out.println("Dodavanje vinila");
        System.out.println(user.getEmail());
        service.newVinyl(vinyl, user);
        return ResponseEntity.status(HttpStatus.SC_CREATED).body("Vinyl added successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVinyl(@PathVariable Integer id, @AuthenticationPrincipal UserAccount user) {
        return service.deleteVinylById(id);
    }

}
