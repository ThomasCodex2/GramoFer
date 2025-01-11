package com.example.gramofer.contoller;

import com.example.gramofer.model.Vinyl;
import com.example.gramofer.service.VinylService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    private final VinylService service;

    public HomeController(VinylService service) {
        this.service = service;
    }

    @GetMapping("/")
    public List<Vinyl> getVinyls() {
        return service.fetchVinyls();
    }
}

