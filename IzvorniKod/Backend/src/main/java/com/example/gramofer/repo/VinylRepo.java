package com.example.gramofer.repo;

import com.example.gramofer.model.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VinylRepo extends JpaRepository<Vinyl,Integer> {

}
