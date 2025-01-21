package com.example.gramofer.repo;

import com.example.gramofer.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserAccount, Integer> {

    Optional<UserAccount> findByUserId(Integer id);

    Optional<UserAccount> findByUsername(String username);

    Optional<UserAccount> findByEmail(String email);
}
