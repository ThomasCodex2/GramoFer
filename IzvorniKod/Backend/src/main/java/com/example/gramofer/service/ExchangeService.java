package com.example.gramofer.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.gramofer.dtos.ExchangeDTO;
import com.example.gramofer.model.Exchange;
import com.example.gramofer.model.Genre;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.repo.EditionRepo;
import com.example.gramofer.repo.ExchangeRepo;
import com.example.gramofer.repo.GenreRepo;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;
import com.example.gramofer.responses.ExchangeResponse;
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

     public List<ExchangeResponse> getExchangesByUserAndStatusActive(UserAccount user) {
        List<Exchange> listOfExchanges = exchangerepo.findAllByUserAndStatusZero(user);
        return listOfExchanges.stream()
            .map(exchange -> {
                ExchangeResponse response = new ExchangeResponse();
                response.setExchangeid(exchange.getExchangeId());
                response.setAlbumname(exchange.getVinyl().getEditionLabel().getAlbumName());
                List<String> lista = new ArrayList<String>();
                for (Vinyl v : exchange.getIncludesOfferedVinyls()) {
                    lista.add(v.getEditionLabel().getAlbumName());
                }
                response.setIsoffering(lista);
                return response;
            })
            .collect(Collectors.toList());
    }
    
    public List<ExchangeResponse> getIncExchangesUserActive(UserAccount isOfferingUser) {
        List<Exchange> listOfExchanges = exchangerepo.findAllByIsOfferingUserAndStatusZero(isOfferingUser);
        return listOfExchanges.stream()
            .map(exchange -> {
                ExchangeResponse response = new ExchangeResponse();
                response.setExchangeid(exchange.getExchangeId());
                response.setAlbumname(exchange.getVinyl().getEditionLabel().getAlbumName());
                List<String> lista = new ArrayList<String>();
                for (Vinyl v : exchange.getIncludesOfferedVinyls()) {
                    lista.add(v.getEditionLabel().getAlbumName());
                }
                response.setIsoffering(lista);
                return response;
            })
            .collect(Collectors.toList());
    }

    public List<ExchangeResponse> getExchangesByUserAndStatusDone(UserAccount user) {
        List<Exchange> listOfExchanges = exchangerepo.findAllByUserAndStatusOne(user);
        return listOfExchanges.stream()
            .map(exchange -> {
                ExchangeResponse response = new ExchangeResponse();
                response.setExchangeid(exchange.getExchangeId());
                response.setAlbumname(exchange.getVinyl().getEditionLabel().getAlbumName());
                List<String> lista = new ArrayList<String>();
                for (Vinyl v : exchange.getIncludesOfferedVinyls()) {
                    lista.add(v.getEditionLabel().getAlbumName());
                }
                response.setIsoffering(lista);
                return response;
            })
            .collect(Collectors.toList());
    }

    public List<ExchangeResponse> getIncExchangesByUserAndStatusDone(UserAccount isOfferingUser) {
        List<Exchange> listOfExchanges = exchangerepo.findAllByIsOfferingUserAndStatusOne(isOfferingUser);
        return listOfExchanges.stream()
            .map(exchange -> {
                ExchangeResponse response = new ExchangeResponse();
                response.setExchangeid(exchange.getExchangeId());
                response.setAlbumname(exchange.getVinyl().getEditionLabel().getAlbumName());
                List<String> lista = new ArrayList<String>();
                for (Vinyl v : exchange.getIncludesOfferedVinyls()) {
                    lista.add(v.getEditionLabel().getAlbumName());
                }
                response.setIsoffering(lista);
                return response;
            })
            .collect(Collectors.toList());
    }

    public String newExchange(ExchangeDTO input, UserAccount user){
        Exchange exchange = new Exchange();
        Optional <Vinyl> vinyl1 = repoVinyl.findById(input.getVinylsid());
        Set <Integer> listavinylid = input.getIsOfferingVinylsToOther();
        if (vinyl1.isPresent()) {
            Vinyl vinyl4 = vinyl1.get();
            exchange.setVinyl(vinyl4);
            exchange.setIsOfferingUser(vinyl4.getUser());
        }
        Set <Vinyl> listaVinyla = new HashSet<Vinyl>();
        for(Integer oneid: listavinylid){
            Optional <Vinyl> vinyl2 = repoVinyl.findById(oneid);
            if (vinyl2.isPresent()) {
                Vinyl vinyl3 = vinyl2.get();
                listaVinyla.add(vinyl3);
            }
        }
        
        exchange.setDate(LocalDate.now());
        exchange.setIncludesOfferedVinyls(listaVinyla);
        exchange.setStatus("ongoing");
        exchange.setUser(user);
        exchangerepo.save(exchange);
        return "uspjeh";
    }

    public String exchangeEnded (Integer id, UserAccount user) {
        Optional<Exchange> otpexchange = exchangerepo.findById(id);
        if (otpexchange.isPresent()) {
            Exchange exchange = otpexchange.get();
            exchange.setStatus("done");
            exchangerepo.save(exchange);
            return "uspjeh";

        }
        else {
            return "greska";
        }
    } 
 
    public String updateExchange(Integer id, UserAccount user, ExchangeDTO input){
       Optional<Exchange> optexchange = exchangerepo.findById(id); //exchange u bazi
       if (optexchange.isPresent()){ //ispitivanje je li exchange u bazi
           Exchange exchange = optexchange.get();
           Optional <Vinyl> vinyl1 = repoVinyl.findById(input.getVinylsid());
            Set <Integer> listavinylid = input.getIsOfferingVinylsToOther();
            if (vinyl1.isPresent()) {
                Vinyl vinyl4 = vinyl1.get();
                exchange.setVinyl(vinyl4);
            }
        Set <Vinyl> listaVinyla = new HashSet<Vinyl>();
        for(Integer oneid: listavinylid){
            Optional <Vinyl> vinyl2 = repoVinyl.findById(oneid);
            if (vinyl2.isPresent()) {
                Vinyl vinyl3 = vinyl2.get();
                listaVinyla.add(vinyl3);
            }
        }
        exchange.setIsOfferingUser((repoVinyl.findById(input.getIsOfferingVinylsToOther().iterator().next())).get().getUser());
        exchangerepo.save(exchange);
           return "uspjeh";
       } //exchange u bazi 
       else { //ako Exchange ne postoji u bazi
           return "Greska1";
       }
    }


}
