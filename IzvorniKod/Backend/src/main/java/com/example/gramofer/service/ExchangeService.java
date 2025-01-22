package com.example.gramofer.service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.gramofer.dtos.ExchangeDTO;
import com.example.gramofer.dtos.VinylDto;
import com.example.gramofer.model.Edition;
import com.example.gramofer.model.Exchange;
import com.example.gramofer.model.Genre;
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

     public List<Exchange> getExchangesByUserAndStatusActive(UserAccount user) {
        return exchangerepo.findAllByUserAndStatusZero(user);
    }
    
    public List<Exchange> getIncExchangesUserActive(UserAccount isOfferingUser) {
        return exchangerepo.findAllByIsOfferingUserAndStatusZero(isOfferingUser);
    }

    public List<Exchange> getExchangesByUserAndStatusDone(UserAccount user) {
        return exchangerepo.findAllByUserAndStatusOne(user);
    }

    public List<Exchange> getIncExchangesByUserAndStatusDone(UserAccount isOfferingUser) {
        return exchangerepo.findAllByIsOfferingUserAndStatusOne(isOfferingUser);
    }

    

    public String newExchange(ExchangeDTO input, UserAccount user){
        Exchange exchange = new Exchange();
        exchange.setDate(LocalDate.now());
        exchange.setIsOfferingUser(input.getVinylsid().getUser());
        exchange.setIncludesOfferedVinyls(input.getIsOfferingVinylsToOther());
        exchange.setStatus("ongoing");
        exchange.setVinyl(input.getVinylsid());
        exchange.setUser(user);
        exchangerepo.save(exchange);
    return "uspjeh";
    }

     public String updateExchange(Integer id, UserAccount user, ExchangeDTO input){
        Optional<Exchange> optexchange = exchangerepo.findById(id); //exchange u bazi

        if (optexchange.isPresent()){ //ispitivanje je li exchange u bazi
            Exchange exchange = optexchange.get();
            exchange.setVinyl(input.getVinylsid());
            exchange.setIncludesOfferedVinyls(input.getIsOfferingVinylsToOther());
            return "uspjeh";
        } //exchange u bazi
            
        else { //ako ni Vinyl ne postoji u bazi
            return "Greska1";
        }
    }


}
