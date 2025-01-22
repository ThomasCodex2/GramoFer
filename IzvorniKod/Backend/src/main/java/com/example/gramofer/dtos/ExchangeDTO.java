package com.example.gramofer.dtos;

import java.util.Set;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExchangeDTO {

    private Vinyl vinylsid;

    private Set<Vinyl> IsOfferingVinylsToOther;

}