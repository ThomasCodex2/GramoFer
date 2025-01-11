package com.example.gramofer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "Wish")
public class Wish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishID")
    private int wishID;

    @Column(name = "albumName", nullable = false)
    private String albumName;

    @Column(name = "artistName", nullable = false)
    private String artistName;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "userID", nullable = false)
    private UserAccount userAccount;

    @ManyToOne
    @JoinColumn(name = "editionLabel", referencedColumnName = "editionLabel")
    private Edition edition;

}

