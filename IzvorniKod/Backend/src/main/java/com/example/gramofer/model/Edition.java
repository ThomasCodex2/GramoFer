package com.example.gramofer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Set;


@Entity
@Data
public class Edition {

    @Id
    @Column(nullable = false, updatable = false, length = 127)
    private String editionLabel;

    @Column(nullable = false, length = 127)
    private String artistName;

    @Column(nullable = false)
    private Integer releaseDate;

    @Column(nullable = false)
    private String albumName;

    @Column(nullable = false)
    private String countryOfOrigin;

    @ManyToMany
    @JoinTable(
            name = "BelongsToGenre",
            joinColumns = @JoinColumn(name = "editionLabel"),
            inverseJoinColumns = @JoinColumn(name = "genreId")
    )
    private Set<Genre> belongsToGenreGenres;

    @OneToMany(mappedBy = "editionLabel")
    private Set<Vinyl> editionLabelVinyls;

    @OneToMany(mappedBy = "editionLabel")
    private Set<Wish> editionLabelWishes;

    public String getEditionLabel() {
        return editionLabel;
    }

    public void setEditionLabel(final String editionLabel) {
        this.editionLabel = editionLabel;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(final String artistName) {
        this.artistName = artistName;
    }

    public Integer getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(final Integer releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(final String albumName) {
        this.albumName = albumName;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(final String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }

    public Set<Genre> getBelongsToGenreGenres() {
        return belongsToGenreGenres;
    }

    public void setBelongsToGenreGenres(final Set<Genre> belongsToGenreGenres) {
        this.belongsToGenreGenres = belongsToGenreGenres;
    }

    public Set<Vinyl> getEditionLabelVinyls() {
        return editionLabelVinyls;
    }

    public void setEditionLabelVinyls(final Set<Vinyl> editionLabelVinyls) {
        this.editionLabelVinyls = editionLabelVinyls;
    }

    public Set<Wish> getEditionLabelWishes() {
        return editionLabelWishes;
    }

    public void setEditionLabelWishes(final Set<Wish> editionLabelWishes) {
        this.editionLabelWishes = editionLabelWishes;
    }

}
