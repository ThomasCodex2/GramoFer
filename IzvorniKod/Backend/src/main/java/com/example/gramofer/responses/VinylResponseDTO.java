package com.example.gramofer.responses;

import com.example.gramofer.model.Edition;

import lombok.Data;

@Data
public class VinylResponseDTO {
    private Integer vinylId;
    private String vinylCondition;
    private String coverCondition;
    private String description;
    private String vinylImagePath1;
    private String vinylImagePath2;
    private String coverImagePath1;
    private String coverImagePath2;
    private Integer available;
    private String onLocation;
    private Edition editionLabel;

}