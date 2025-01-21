package com.example.gramofer.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.gramofer.model.Exchange;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.repo.EditionRepo;
import com.example.gramofer.repo.ExchangeRepo;
import com.example.gramofer.repo.GenreRepo;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;
import com.example.gramofer.responses.VinylResponseDTO;

@Service
public class ExchangeService {
    
    private final VinylRepo repoVinyl;
    private final UserRepo userRepo;
    private final GenreRepo genreRepo;
    private final EditionRepo editionrepo;
    private final ExchangeRepo exchangerepo;

    public ExchangeService(VinylRepo repoVinyl, UserRepo userRepo, GenreRepo genreRepo, EditionRepo editionrepo, ExchangeRepo exchangerepo) {
        this.repoVinyl = repoVinyl;
        this.userRepo = userRepo;
        this.genreRepo = genreRepo;
        this.editionrepo = editionrepo;
        this.exchangerepo = exchangerepo;

    }

     public List<Exchange> getExchangesByUserAndStatusZero(UserAccount user) {
        return exchangerepo.findAllByUserAndStatusZero(user);
    }

    
    public List<Exchange> getExchangesByIsOfferingUserAndStatusZero(UserAccount isOfferingUser) {
        return exchangerepo.findAllByIsOfferingUserAndStatusZero(isOfferingUser);
    }

    public List<Exchange> getExchangesByUserAndStatusOne(UserAccount user) {
        return exchangerepo.findAllByUserAndStatusOne(user);
    }

    public List<Exchange> getExchangesByIsOfferingUserAndStatusOne(UserAccount isOfferingUser) {
        return exchangerepo.findAllByIsOfferingUserAndStatusOne(isOfferingUser);
    }



}
