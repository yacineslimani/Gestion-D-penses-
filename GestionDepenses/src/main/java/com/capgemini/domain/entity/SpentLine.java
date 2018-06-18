package com.capgemini.domain.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class SpentLine {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String name;
	private String description;
	private double amount;
	
	@ManyToOne
    @JoinColumn(name = "spentId")
	private Spent spent;
	
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
	public void setAmount(double price) {
		this.amount = price;
	}
	
	
	public Spent getSpent() {
		return spent;
	}
	
	public void setSpent(Spent spent) {
		this.spent = spent;
	}
	@Override
	public String toString() {
		return "SpentLine [id=" + id + ", name=" + name + ", description=" + description + ", price=" + amount
				+ ", spent=" + spent + "]";
	}
	
	
	
	
}
