package com.example.gramofer.contoller;

import com.example.gramofer.dtos.ExchangeDTO;
import com.example.gramofer.dtos.VinylDto;
import com.example.gramofer.model.Exchange;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.responses.VinylResponseDTO;
import com.example.gramofer.service.ExchangeService;
import com.example.gramofer.service.VinylService;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exchange")
public class ExchangeController {

    private final ExchangeService service;

    public ExchangeController(ExchangeService service) {
        this.service = service;
    }

    @GetMapping("/myExchangesActive")
    public List<Exchange> getExchangesForUserActive (@AuthenticationPrincipal UserAccount user) {
        return service.getExchangesByUserAndStatusActive(user);
    }
    @GetMapping("/incomingExchangesActive")
    public List<Exchange> getIncExchangesForUserActive (@AuthenticationPrincipal UserAccount user) {
        return service.getIncExchangesUserActive(user);
    }
    @GetMapping("/myExchangesDone")
    public List<Exchange> getExchangesForUserDone (@AuthenticationPrincipal UserAccount user) {
        return service.getExchangesByUserAndStatusDone(user);
    }
    @GetMapping("/incomingExchangesDone")
    public List<Exchange> getIncExchangesForUserDone (@AuthenticationPrincipal UserAccount user) {
        return service.getIncExchangesByUserAndStatusDone(user);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addExchange(@AuthenticationPrincipal UserAccount user, @RequestBody ExchangeDTO exchangedto) {
        String zastavica = service.newExchange(exchangedto, user);
        if (zastavica == "uspjeh") {
        return ResponseEntity.status(HttpStatus.SC_CREATED).body("Vinyl added successfully.");
        }
        else {
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Edition already exists");
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateVinyl (@AuthenticationPrincipal UserAccount user, @PathVariable Integer id, @RequestBody ExchangeDTO exchangedto){
        System.out.println("Mijenjanje exchange-a");
        System.out.println(user.getEmail());
        String poruka = service.updateExchange(id, user, exchangedto);
        if (poruka == "Greska1"){
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Ploca ne postoji");
        }
        else if (poruka == "Greska2"){
            return ResponseEntity.status(HttpStatus.SC_NOT_ACCEPTABLE).body("Edition already exists");
        }
        else {
        return ResponseEntity.status(HttpStatus.SC_CREATED).body("Vinyl added changed.");
        }
    }
}
