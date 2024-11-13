package com.example.gramofer.repo;

import com.example.gramofer.model.Korisnickiracun;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisniciRepo extends JpaRepository<Korisnickiracun, Integer> {
}
