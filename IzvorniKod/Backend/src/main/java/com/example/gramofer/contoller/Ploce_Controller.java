package com.example.gramofer.contoller;

import com.example.gramofer.model.Korisnickiracun;
import com.example.gramofer.model.Ploca;
import com.example.gramofer.service.Ploce_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Ploce_Controller {
    @Autowired
    Ploce_Service service;

    //OVO TREBA PROMJENITI DA BUDE PRIKAZ SVIH PLOCA OD KORISNIKA
    @GetMapping("/ploce")
    public List<Ploca> prikazi_ploce(){
        return service.dohvati_sve_ploce();
    }

    @GetMapping("/korisnik")
    public List<Korisnickiracun> prikazi_korisnike(){
        return service.dohvati_sve_korisnike();
    }
}
