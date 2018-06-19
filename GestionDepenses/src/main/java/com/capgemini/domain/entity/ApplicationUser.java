package com.capgemini.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
public class ApplicationUser {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	@NotNull
	private String userName;
	@NotNull
	@Email
	private String email;
	@NotNull
	private String password;

	private String role;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade= CascadeType.ALL)
	private List<Spent> userSpents = new ArrayList<Spent>();

	@ManyToMany(cascade = { CascadeType.ALL})
	@JoinTable(
			name = "Projet_User",
			joinColumns = { @JoinColumn(name = "user_id") },
			inverseJoinColumns = { @JoinColumn(name = "projet_id") }
	)
	private List<Projet> projets = new ArrayList<Projet>();
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	public List<Spent> getUserSpents() {
		return userSpents;
	}
	public void setUserSpents(List<Spent> userSpents) {
		this.userSpents = userSpents;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Projet> getProjets() {
		return projets;
	}

	public void setProjets(List<Projet> projets) {
		this.projets = projets;
	}
}
