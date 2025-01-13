package com.example.gramofer.repo;

import com.example.gramofer.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserAccount, Integer> {
    //UserAccount findBygoogleid(String googleid);

    //@Query("SELECT u.userid FROM UserAccount u WHERE u.username = :username")
    //Integer findUserIdByUsername(@Param("username") String username);

    Optional<UserAccount> findByUserId(Integer id);

    Optional<UserAccount> findByUsername(String username);

    Optional<UserAccount> findByEmail(String email);
}
