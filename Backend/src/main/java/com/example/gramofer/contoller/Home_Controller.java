package com.example.gramofer.contoller;

import com.example.gramofer.model.Ploca;
import com.example.gramofer.service.Ploce_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Home_Controller {
    @Autowired
    Ploce_Service service;

    @GetMapping("/")
    public List<Ploca> prikazi_ploce(){
        return service.dohvati_sve_ploce();
    }
}
