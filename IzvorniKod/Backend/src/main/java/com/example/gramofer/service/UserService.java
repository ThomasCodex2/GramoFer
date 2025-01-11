package com.example.gramofer.service;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepo userRepo;

   @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    public List<UserAccount> fetchUsers() {
       return userRepo.findAll();
    }

    public UserAccount findUserByGoogleId(String googleId){
        return userRepo.findBygoogleid(googleId);
    }

    public void saveUser(UserAccount userAccount){
        userRepo.save(userAccount);
    }

    public void addUser(UserAccount userAccount) {
        userRepo.save(userAccount);
    }
}
