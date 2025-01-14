package com.example.gramofer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Exchange {

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
    private Integer exchangeId;

    @Column(nullable = false, length = 15)
    private String status;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserAccount user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "is_offering_user_id", nullable = false)
    @JsonBackReference
    private UserAccount isOfferingUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vinyl_id", nullable = false)
    private Vinyl vinyl;

    @ManyToMany
    @JoinTable(
            name = "IncludesOffered",
            joinColumns = @JoinColumn(name = "exchangeId"),
            inverseJoinColumns = @JoinColumn(name = "vinylId")
    )
    private Set<Vinyl> includesOfferedVinyls;

    public Integer getExchangeId() {
        return exchangeId;
    }

    public void setExchangeId(final Integer exchangeId) {
        this.exchangeId = exchangeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(final LocalDate date) {
        this.date = date;
    }

    public UserAccount getUser() {
        return user;
    }

    public void setUser(final UserAccount user) {
        this.user = user;
    }

    public UserAccount getIsOfferingUser() {
        return isOfferingUser;
    }

    public void setIsOfferingUser(final UserAccount isOfferingUser) {
        this.isOfferingUser = isOfferingUser;
    }

    public Vinyl getVinyl() {
        return vinyl;
    }

    public void setVinyl(final Vinyl vinyl) {
        this.vinyl = vinyl;
    }

    public Set<Vinyl> getIncludesOfferedVinyls() {
        return includesOfferedVinyls;
    }

    public void setIncludesOfferedVinyls(final Set<Vinyl> includesOfferedVinyls) {
        this.includesOfferedVinyls = includesOfferedVinyls;
    }

}
