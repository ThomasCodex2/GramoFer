package com.example.gramofer.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Genre {

    @Id
    @Column(nullable = false, updatable = false)
    @SequenceGenerator(
            name = "primary_sequence",
            sequenceName = "primary_sequence",
            allocationSize = 1,
            initialValue = 10000
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "primary_sequence"
    )
    private Integer genreId;

    @Column(nullable = false, length = 30)
    private String genreName;

    @ManyToMany(mappedBy = "belongsToGenreGenres")
    @JsonBackReference
    private Set<Edition> belongsToGenreEditions;

    public Integer getGenreId() {
        return genreId;
    }

    public void setGenreId(final Integer genreId) {
        this.genreId = genreId;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(final String genreName) {
        this.genreName = genreName;
    }

    public Set<Edition> getBelongsToGenreEditions() {
        return belongsToGenreEditions;
    }

    public void setBelongsToGenreEditions(final Set<Edition> belongsToGenreEditions) {
        this.belongsToGenreEditions = belongsToGenreEditions;
    }

}
