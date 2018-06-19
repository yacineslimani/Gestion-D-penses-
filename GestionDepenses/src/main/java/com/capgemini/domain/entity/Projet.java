package com.capgemini.domain.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Projet {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String nom;
    private String description;
    @ManyToMany(mappedBy = "projets")
    private List<ApplicationUser> users = new ArrayList<ApplicationUser>();

    @OneToMany(mappedBy = "projet", fetch = FetchType.LAZY, cascade= CascadeType.ALL)
    private List<Spent> spents = new ArrayList<Spent>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ApplicationUser> getUsers() {
        return users;
    }

    public void setUsers(List<ApplicationUser> users) {
        this.users = users;
    }

    public List<Spent> getSpents() {
        return spents;
    }

    public void setSpents(List<Spent> spents) {
        this.spents = spents;
    }
}
