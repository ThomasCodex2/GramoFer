package com.example.gramofer.service;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VinylService {

    @Autowired
    VinylRepo repoVinyl;

    @Autowired
    UserRepo repoUsers;

    public List<Vinyl> fetchVinyls() {
        return repoVinyl.findAll();
    }

    public void addVinyl(Vinyl vinyl) {
        repoVinyl.save(vinyl);
    }

    public void updateVinyl(Vinyl  vinyl) {
        repoVinyl.save(vinyl);
    }

    public void deleteVinyl(int id) {
        repoVinyl.deleteById(id);
    }

    public List<UserAccount> fetchUsers() {
        return repoUsers.findAll();
    }
}
