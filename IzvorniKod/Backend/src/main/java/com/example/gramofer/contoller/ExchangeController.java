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

    @GetMapping("/myExchanges")
    public List<Exchange> getExchangesForUser (@AuthenticationPrincipal UserAccount user) {
        return service.getExchangesByUserAndStatusZero(user);
    }
}
