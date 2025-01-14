package com.example.gramofer.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VinylDto {

    private String vinylCondition;

    private String coverCondition;

    private String description;

    private String vinylImagePath1;

    private String vinylImagePath2;

    private String coverImagePath1;

    private String coverImagePath2;

    private EditionDto edition;

}