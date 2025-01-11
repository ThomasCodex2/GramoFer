package com.example.gramofer.repo;

import com.example.gramofer.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserAccount, Integer> {
    UserAccount findBygoogleid(String googleid);
}
