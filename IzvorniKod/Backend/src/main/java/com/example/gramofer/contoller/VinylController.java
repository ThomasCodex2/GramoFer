package com.example.gramofer.contoller;

import com.example.gramofer.model.Vinyl;
import com.example.gramofer.service.VinylService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class VinylController {
    @Autowired
    VinylService service;

    //OVO TREBA PROMJENITI DA BUDE PRIKAZ SVIH PLOCA OD KORISNIKA
    @GetMapping("/vinyl")
    public List<Vinyl> getVinyls() {
        return service.fetchVinyls();
    }


    @PostMapping("/vinyl")
    public void addVinyl(@RequestBody Vinyl vinyl, HttpServletResponse httpServletResponse) {
        service.addVinyl(vinyl);
        httpServletResponse.setStatus(201);
    }

}
