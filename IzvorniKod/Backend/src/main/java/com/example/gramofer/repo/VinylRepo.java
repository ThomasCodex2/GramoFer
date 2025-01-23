package com.example.gramofer.repo;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VinylRepo extends JpaRepository<Vinyl,Integer> {
    List<Vinyl> findByUser(UserAccount user);

    Optional<Vinyl> findById(Integer id);
}
