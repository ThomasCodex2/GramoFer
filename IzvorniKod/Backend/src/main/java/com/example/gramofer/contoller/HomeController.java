package com.example.gramofer.contoller;

import com.example.gramofer.model.Vinyl;
import com.example.gramofer.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {
    @Autowired
    VinylService service;

    @GetMapping("/")
    public List<Vinyl> prikazi_ploce(){
        return service.fetchVinyls();
    }
}
