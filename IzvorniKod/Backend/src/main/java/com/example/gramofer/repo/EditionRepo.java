package com.example.gramofer.repo;

import com.example.gramofer.model.Edition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditionRepo extends JpaRepository<Edition, String> {

}