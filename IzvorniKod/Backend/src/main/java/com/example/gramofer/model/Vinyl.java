package com.example.gramofer.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Vinyl")
public class Vinyl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vinylid")
    private int vinylID;

    @Column(name = "vinylcondition", nullable = false)
    private String vinylCondition;

    @Column(name = "covercondition", nullable = false)
    private String coverCondition;

    @Column(name = "description")
    private String description;

    @Column(name = "vinylimagepath1")
    private String vinylImagePath1;

    @Column(name = "vinylimagepath2")
    private String vinylImagePath2;

    @Column(name = "coverimagepath1", nullable = false)
    private String coverImagePath1;

    @Column(name = "coverimagepath2", nullable = false)
    private String coverImagePath2;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "userid", nullable = false)
    private UserAccount userAccount;

    @ManyToOne
    @JoinColumn(name = "editionlabel", referencedColumnName = "editionlabel", nullable = false)
    private Edition edition;

}
