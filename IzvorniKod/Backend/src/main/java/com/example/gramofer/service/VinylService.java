package com.example.gramofer.service;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VinylService {

    private final VinylRepo repoVinyl;
    private final UserRepo userRepo;


    public VinylService(VinylRepo repoVinyl, UserRepo userRepo) {
        this.repoVinyl = repoVinyl;
        this.userRepo = userRepo;

    }

    public List<Vinyl> getAllVinylByUsername(String username) {
        Optional<UserAccount> user = userRepo.findByUsername(username);
        return repoVinyl.findByUser(user.get());
    }

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


}
