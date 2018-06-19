package com.capgemini.presentation.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.domain.entity.Spent;
import com.capgemini.domain.entity.ApplicationUser;
import com.capgemini.domain.repository.ApplicationUserRepository;

import javax.validation.Valid;

@RestController
@RequestMapping(value="users")
public class UserController {
	@Autowired
	ApplicationUserRepository userRepository;

	private ApplicationUserRepository applicationUserRepository;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public UserController(ApplicationUserRepository applicationUserRepository,
			BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.applicationUserRepository = applicationUserRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	@PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@Valid @RequestBody ApplicationUser user) {
		ApplicationUser userTest =  applicationUserRepository.findByEmail(user.getEmail());
		if(applicationUserRepository.findByEmail(user.getEmail()) == null){
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			applicationUserRepository.save(user);
			return new ResponseEntity<String>(HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("l'utilisateur existe déja",HttpStatus.BAD_REQUEST);
		}
    }


	@RequestMapping(value="/add", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public void addUser(@RequestBody ApplicationUser user){
		userRepository.save(user);
	}

	@RequestMapping(value="/find/{id}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ApplicationUser findUser(@PathVariable("id") Long id){
		return userRepository.findById(id).get();
	}

	@RequestMapping(value="/find/all", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public Iterable<ApplicationUser> findUser(){
		return userRepository.findAll();
	}
	
	@RequestMapping(value="/login/test", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> login(){
		return new ResponseEntity<String>(HttpStatus.OK);
	}


}
