package com.example.gramofer.repo;

import com.example.gramofer.model.Ploca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Ploce_Repo extends JpaRepository<Ploca,Integer> {

}
