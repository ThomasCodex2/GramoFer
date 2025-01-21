package com.example.gramofer.dtos;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExchangeDTO {

    private String VinylId;

    private Set<String> IsOfferingVinylsToOther;


}