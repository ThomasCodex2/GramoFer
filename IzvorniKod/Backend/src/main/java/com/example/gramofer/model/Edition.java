package com.example.gramofer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Edition")
public class Edition {

    @Id
    @Column(name = "editionLabel")
    private String editionLabel;

    @Column(name = "artistName", nullable = false)
    private String artistName;

    @Column(name = "releaseDate", nullable = false)
    private int releaseDate;

    @Column(name = "albumName", nullable = false)
    private String albumName;

    @Column(name = "countryOfOrigin", nullable = false)
    private String countryOfOrigin;

}

