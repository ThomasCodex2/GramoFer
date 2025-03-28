package com.example.gramofer.contoller;

import com.example.gramofer.dtos.VinylDto;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.responses.VinylResponseDTO;
import com.example.gramofer.service.VinylService;
import com.example.gramofer.service.WishService;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vinyls")
public class VinylController {

    private final VinylService service;
    private final WishService wishservice;

    public VinylController(VinylService service, WishService wishservice) {
        this.service = service;
        this.wishservice = wishservice;
    }

    @GetMapping("/vinyl")
    public List<VinylResponseDTO> getVinyls() {
        return service.getAllVinyls();
    }

    @GetMapping("/myVinyl")
    public List<VinylResponseDTO> getVinylsByUsername(@AuthenticationPrincipal UserAccount user) {
        return service.getVinylByUser(user);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addVinyl(@AuthenticationPrincipal UserAccount user, @RequestBody VinylDto vinyl) {
        String zastavica = service.newVinyl(vinyl, user);

        if (zastavica == "uspjehimail") {
            return ResponseEntity.status(HttpStatus.SC_CREATED).body("Vinyl added successfully.");
        } else if (zastavica == "uspjeh") {
            return ResponseEntity.status(HttpStatus.SC_CREATED).body("Vinyl added successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Edition already exists");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVinyl(@PathVariable Integer id, @AuthenticationPrincipal UserAccount user) {
        return service.deleteVinylById(id);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateVinyl(@AuthenticationPrincipal UserAccount user, @PathVariable Integer id, @RequestBody VinylDto vinyl){
        String poruka = service.updateV(id, user, vinyl);
        if (poruka == "Greska1") {
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Ploca ne postoji");
        } else if (poruka == "Greska2") {
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Edition already exists");
        } else {
            return ResponseEntity.status(HttpStatus.SC_CREATED).body("Vinyl added changed.");
        }
    }

    @GetMapping("/vinyl/{genre}/{releaseDate}")
    public List<VinylResponseDTO> getVinylsByGenre(@PathVariable String genre, @PathVariable Integer releaseDate){
        return service.getAllVinylsByGenre(genre, releaseDate);
    }

    @GetMapping("/vinyl/search/{genre}")
    public List<VinylResponseDTO> getVinylsByGenreSearch(@PathVariable String genre, @RequestParam String searchTerm){
        return service.getSearchVinylsByGenre(searchTerm, genre);
    }

    @GetMapping("/vinyl/searchAllVinyls")
    public List<VinylResponseDTO> getAllVinylsBySearchTerm(@RequestParam String searchTerm){
        return service.getSearchAllVinylsBySearchTerm(searchTerm);
    }
}