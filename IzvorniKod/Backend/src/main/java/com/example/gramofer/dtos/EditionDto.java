package com.example.gramofer.dtos;
import java.util.List;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditionDto {
    
    private String editionLabel;

    private String artistName;
    
    private String releaseDate;
    
    private String albumName;
    
    private String countryOfOrigin;
    
    private Set<String> genres;
}
