package com.example.gramofer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Korisnickiracun {
    @Id
    private int idkorisnika;
    private String username;
    private String email;
    private String lozinka;
    private String ime;
    private String prezime;
    private int jeadmin;
    private LocalDate datumregistracije;
}
