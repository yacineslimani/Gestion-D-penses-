package com.capgemini.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class ApplicationUser {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String userName;

	private String password;

	private String role;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade= CascadeType.ALL)
	private List<Spent> userSpents = new ArrayList<Spent>();
	
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
	
	
}
