package com.example.gramofer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Stack;
@Component
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class Ploca {
    @Id
    @Column(name = "idploce")
    private int idPloce;

    @Column(name = "idkorisnika")
    private int idKorisnika;

    @Column(name = "oznakaizdanja")
    private String oznakaIzdanja;

    @Column(name = "nazivalbuma")
    private String nazivAlbuma;

    @Column(name = "izvodjac")
    private String izvodjac;

    @Column(name = "godinaizdavanja")
    private int godinaIzdavanja;

    @Column(name = "stanjeploce")
    private String stanjePloce;

    @Column(name = "stanjeomota")
    private String stanjeOmota;

    @Column(name = "pathomot1")
    private String pathOmot1;

    @Column(name = "pathomot2")
    private String pathOmot2;

    @Column(name = "pathploca1")
    private String pathPloca1;

    @Column(name = "pathploca2")
    private String pathPloca2;

    @Column(name = "opis")
    private String opis;

}
