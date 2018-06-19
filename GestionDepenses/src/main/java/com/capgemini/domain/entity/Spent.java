package com.capgemini.domain.entity;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Spent {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String name;
	private String description;
	private double amount;
	private Date date;

	@ManyToOne
	@JoinColumn(name = "projetId")
	private Projet projet;
	
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "userId")
	private ApplicationUser user;
	
	
	@OneToMany(mappedBy = "spent", fetch = FetchType.LAZY, cascade= CascadeType.ALL)
	private List<SpentLine> spents = new ArrayList<SpentLine>();
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	
	public List<SpentLine> getSpents() {
		return spents;
	}
	public void setSpents(List<SpentLine> spents) {
		this.spents = spents;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public ApplicationUser getUser() {
		return user;
	}
	public void setUser(ApplicationUser user) {
		this.user = user;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}
}
