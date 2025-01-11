package com.example.gramofer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "Exchange")
public class Exchange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchangeID")
    private int exchangeID;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "date", nullable = false)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "userID", nullable = false)
    private UserAccount userAccount;

    @ManyToOne
    @JoinColumn(name = "isOffering_userID", referencedColumnName = "userID", nullable = false)
    private UserAccount offeringUserAccount;

    @ManyToOne
    @JoinColumn(name = "vinylID", referencedColumnName = "vinylID", nullable = false)
    private Vinyl vinyl;

}

