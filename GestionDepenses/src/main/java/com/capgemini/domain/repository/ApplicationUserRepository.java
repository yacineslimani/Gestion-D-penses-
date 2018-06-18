package com.capgemini.domain.repository;

import org.springframework.data.repository.CrudRepository;

import com.capgemini.domain.entity.ApplicationUser;

public interface ApplicationUserRepository extends CrudRepository<ApplicationUser, Long>{
	ApplicationUser findByUserName(String username);
	boolean existsByuserName(String userName);
}
