package com.example.gramofer.dtos;

import java.util.Set;

import com.example.gramofer.model.Vinyl;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExchangeDTO {

    private Integer vinylsid;

    private Set<Integer> IsOfferingVinylsToOther;

}