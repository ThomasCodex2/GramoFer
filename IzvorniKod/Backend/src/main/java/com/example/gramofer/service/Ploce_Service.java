package com.example.gramofer.service;

import com.example.gramofer.model.Korisnickiracun;
import com.example.gramofer.model.Ploca;
import com.example.gramofer.repo.KorisniciRepo;
import com.example.gramofer.repo.Ploce_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Ploce_Service {

    @Autowired
    Ploce_Repo repoPloce;

    @Autowired
    KorisniciRepo repoKorisnici;

    public List<Ploca> dohvati_sve_ploce() {
        return repoPloce.findAll();
    }

    public void dodaj_plocu(Ploca ploca) {
        repoPloce.save(ploca);
    }

    public void izmijeni_plocu(Ploca ploca) {
        repoPloce.save(ploca);
    }

    public void obrisi_plocu(int id) {
        repoPloce.deleteById(id);
    }

    public List<Korisnickiracun> dohvati_sve_korisnike() {
        return repoKorisnici.findAll();
    }
}
