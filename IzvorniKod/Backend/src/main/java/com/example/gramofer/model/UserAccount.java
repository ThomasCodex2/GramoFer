package com.example.gramofer.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class UserAccount implements UserDetails {

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
    private Integer userId;

    @Column(nullable = false, unique = true, length = 320)
    private String username;

    @Column(nullable = false, unique = true, length = 320)
    private String email;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(nullable = false, length = 31)
    private String firstName;

    @Column(nullable = false, length = 31)
    private String lastName;

    @Column(nullable = false)
    private Integer isAdmin;

    @Column(nullable = false)
    private LocalDate registrationDate;

    @Column(nullable = true, unique = true, length = 511)
    private String googleId;

    @Column(nullable = false)
    private Integer strikeCount;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Reports> userReportses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Vinyl> userVinyls;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Exchange> userExchanges;

    @OneToMany(mappedBy = "isOfferingUser", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Exchange> isOfferingUserExchanges;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Wish> userWishes;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(final Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public Integer getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(final Integer isAdmin) {
        this.isAdmin = isAdmin;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(final LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(final String googleId) {
        this.googleId = googleId;
    }

    public Integer getStrikeCount() {
        return strikeCount;
    }

    public void setStrikeCount(final Integer strikeCount) {
        this.strikeCount = strikeCount;
    }

    public Set<Reports> getUserReportses() {
        return userReportses;
    }

    public void setUserReportses(final Set<Reports> userReportses) {
        this.userReportses = userReportses;
    }

    public Set<Vinyl> getUserVinyls() {
        return userVinyls;
    }

    public void setUserVinyls(final Set<Vinyl> userVinyls) {
        this.userVinyls = userVinyls;
    }

    public Set<Exchange> getUserExchanges() {
        return userExchanges;
    }

    public void setUserExchanges(final Set<Exchange> userExchanges) {
        this.userExchanges = userExchanges;
    }

    public Set<Exchange> getIsOfferingUserExchanges() {
        return isOfferingUserExchanges;
    }

    public void setIsOfferingUserExchanges(final Set<Exchange> isOfferingUserExchanges) {
        this.isOfferingUserExchanges = isOfferingUserExchanges;
    }

    public Set<Wish> getUserWishes() {
        return userWishes;
    }

    public void setUserWishes(final Set<Wish> userWishes) {
        this.userWishes = userWishes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
}
