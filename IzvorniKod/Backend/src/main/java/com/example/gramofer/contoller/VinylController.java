package com.example.gramofer.contoller;

import com.example.gramofer.model.Vinyl;
import com.example.gramofer.service.VinylService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VinylController {

    private final VinylService service;

    public VinylController(VinylService service) {
        this.service = service;
    }

    //OVO TREBA PROMJENITI DA BUDE PRIKAZ SVIH PLOCA OD KORISNIKA
    @GetMapping("/vinyl")
    public List<Vinyl> getVinyls() {
        return service.fetchVinyls();
    }

    @GetMapping("/vinyl/{username}")
    public List<Vinyl> getVinylsByUsername(@PathVariable String username) {
        return service.getAllVinylByUsername(username);
    }


    @PostMapping("/vinyl")
    public void addVinyl(@RequestBody Vinyl vinyl, HttpServletResponse httpServletResponse) {
        System.out.println(vinyl.toString());
        service.addVinyl(vinyl);
        httpServletResponse.setStatus(201);
    }

}
