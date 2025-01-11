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
    private int vinylid;

    @Column(name = "vinylcondition", nullable = false)
    private String vinylcondition;

    @Column(name = "covercondition", nullable = false)
    private String covercondition;

    @Column(name = "description")
    private String description;

    @Column(name = "vinylimagepath1")
    private String vinylimagepath1;

    @Column(name = "vinylimagepath2")
    private String vinylimagepath2;

    @Column(name = "coverimagepath1", nullable = false)
    private String coverimagepath1;

    @Column(name = "coverimagepath2", nullable = false)
    private String coverimagepath2;

    @Column(name = "userid", nullable = false)
    private int userid;

    @Column(name = "editionlabel", nullable = false)
    private String editionlabel;

    @Override
    public String toString() {
        return "Vinyl{" +
                "vinylid=" + vinylid +
                ", vinylcondition='" + vinylcondition + '\'' +
                ", covercondition='" + covercondition + '\'' +
                ", description='" + description + '\'' +
                ", vinylimagepath1='" + vinylimagepath1 + '\'' +
                ", vinylimagepath2='" + vinylimagepath2 + '\'' +
                ", coverimagepath1='" + coverimagepath1 + '\'' +
                ", coverimagepath2='" + coverimagepath2 + '\'' +
                ", userid=" + userid +
                ", edition='" + editionlabel + '\'' +
                '}';
    }
}
