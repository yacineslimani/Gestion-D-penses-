package com.capgemini.domain.repository;

import org.springframework.data.repository.CrudRepository;

import com.capgemini.domain.entity.Spent;

public interface SpentRepository extends CrudRepository<Spent, Long> {
	

}
