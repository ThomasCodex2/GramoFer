package com.example.gramofer.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;


@Entity
@Data
public class Wish {

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
    private Integer wishId;

    @Column(nullable = false)
    private String albumName;

    @Column(nullable = false)
    private String artistName;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserAccount user;

    @ManyToOne
    @JoinColumn(name = "edition_label_id")
    @JsonBackReference
    private Edition editionLabel;

    public Integer getWishId() {
        return wishId;
    }

    public void setWishId(final Integer wishId) {
        this.wishId = wishId;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(final String albumName) {
        this.albumName = albumName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(final String artistName) {
        this.artistName = artistName;
    }

    public UserAccount getUser() {
        return user;
    }

    public void setUser(final UserAccount user) {
        this.user = user;
    }

    public Edition getEditionLabel() {
        return editionLabel;
    }

    public void setEditionLabel(final Edition editionLabel) {
        this.editionLabel = editionLabel;
    }

}
