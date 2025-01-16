package com.example.gramofer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Data
public class Vinyl {

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
    private Integer vinylId;

    @Column(nullable = false, length = 31)
    private String vinylCondition;

    @Column(nullable = false, length = 31)
    private String coverCondition;

    @Column
    private String description;

    @Column
    private String vinylImagePath1;

    @Column
    private String vinylImagePath2;

    @Column(nullable = false)
    private String coverImagePath1;

    @Column(nullable = false)
    private String coverImagePath2;

    @Column(nullable = false)
    private Integer available;

    @Column(nullable = false)
    private String onLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserAccount user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edition_label_id", nullable = false)
    @JsonBackReference
    private Edition editionLabel;

    @OneToMany(mappedBy = "vinyl")
    @JsonManagedReference
    private Set<Exchange> vinylExchanges;

    @ManyToMany(mappedBy = "includesOfferedVinyls")
    @JsonManagedReference
    private Set<Exchange> includesOfferedExchanges;

    public Integer getVinylId() {
        return vinylId;
    }

    public void setVinylId(final Integer vinylId) {
        this.vinylId = vinylId;
    }

    public String getVinylCondition() {
        return vinylCondition;
    }

    public void setVinylCondition(final String vinylCondition) {
        this.vinylCondition = vinylCondition;
    }

    public String getCoverCondition() {
        return coverCondition;
    }

    public void setCoverCondition(final String coverCondition) {
        this.coverCondition = coverCondition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getVinylImagePath1() {
        return vinylImagePath1;
    }

    public void setVinylImagePath1(final String vinylImagePath1) {
        this.vinylImagePath1 = vinylImagePath1;
    }

    public String getVinylImagePath2() {
        return vinylImagePath2;
    }

    public void setVinylImagePath2(final String vinylImagePath2) {
        this.vinylImagePath2 = vinylImagePath2;
    }

    public String getCoverImagePath1() {
        return coverImagePath1;
    }

    public void setCoverImagePath1(final String coverImagePath1) {
        this.coverImagePath1 = coverImagePath1;
    }

    public String getCoverImagePath2() {
        return coverImagePath2;
    }

    public void setCoverImagePath2(final String coverImagePath2) {
        this.coverImagePath2 = coverImagePath2;
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

    public Set<Exchange> getVinylExchanges() {
        return vinylExchanges;
    }

    public void setVinylExchanges(final Set<Exchange> vinylExchanges) {
        this.vinylExchanges = vinylExchanges;
    }

    public Set<Exchange> getIncludesOfferedExchanges() {
        return includesOfferedExchanges;
    }

    public void setIncludesOfferedExchanges(final Set<Exchange> includesOfferedExchanges) {
        this.includesOfferedExchanges = includesOfferedExchanges;
    }

}
