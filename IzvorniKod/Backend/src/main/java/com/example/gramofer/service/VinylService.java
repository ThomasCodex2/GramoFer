package com.example.gramofer.service;

import com.example.gramofer.model.Vinyl;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VinylService {

    private final VinylRepo repoVinyl;
    private final UserRepo userRepo;


    public VinylService(VinylRepo repoVinyl, UserRepo userRepo) {
        this.repoVinyl = repoVinyl;
        this.userRepo = userRepo;

    }

    public List<Vinyl> getAllVinylByUsername(String username) {
        int id = userRepo.findUserIdByUsername(username);
        return repoVinyl.findByuserid(id);
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
