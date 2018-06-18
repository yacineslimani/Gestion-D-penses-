package com.capgemini.presentation.controller;




import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.domain.entity.Spent;
import com.capgemini.domain.entity.SpentLine;
import com.capgemini.domain.entity.ApplicationUser;
import com.capgemini.domain.repository.SpentLineRepository;
import com.capgemini.domain.repository.SpentRepository;
import com.capgemini.domain.repository.ApplicationUserRepository;



@RestController
@CrossOrigin
@RequestMapping(value="spent")
public class DepenseController {
	@Autowired
	SpentRepository spentRepository;
	@Autowired
	SpentLineRepository spentLineRepository;
	@Autowired
	ApplicationUserRepository userRepository;

	@RequestMapping(value="find/{id}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Spent>  findSpent(@PathVariable("id") Long id){
		try {
			Spent spent = spentRepository.findById(id).get();
			return new ResponseEntity<Spent>(spent, HttpStatus.OK);
			
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Spent>(HttpStatus.NO_CONTENT);
		}
	}
	
	@RequestMapping(value="find/all", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Spent>  findAllSpent(Authentication authentication){
		ApplicationUser currentUser = userRepository.findByUserName(authentication.getName());
		currentUser.getUserSpents();
		return currentUser.getUserSpents();
	}

	@RequestMapping(value="add", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public void addSpent(@RequestBody Spent spent, Authentication authentication){
		
		ApplicationUser currentUser = userRepository.findByUserName(authentication.getName());
		spent.setUser(currentUser);
		for (SpentLine spentLine : spent.getSpents()) {
			spentLine.setSpent(spent);
		} 
		spentRepository.save(spent);
	}
	
	@RequestMapping(value="/add/spentLine/{id}", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public void addSpentLine(@RequestBody SpentLine spentLine, @PathVariable("id") Long id){
		Spent spent = spentRepository.findById(id).get();
		spentLine.setSpent(spent);
		spentLineRepository.save(spentLine);
	}

	@RequestMapping(value="/update/{id}", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public void updateSpent(@RequestBody Spent newSpent, @PathVariable("id") Long id){
		Spent spent = spentRepository.findById(id).get();
		spent.setDescription(newSpent.getDescription());
		spent.setName(newSpent.getName());
		spent.setAmount(newSpent.getAmount());
		for (SpentLine spentLine : newSpent.getSpents()) {
			spentLine.setSpent(spent);
		} 
		spent.setSpents(newSpent.getSpents());
		
		spentRepository.save(spent);	
	}
	
	@RequestMapping(value="/update/spentLine/{id}", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public void updateSpentLine(@RequestBody SpentLine newSpentLine, @PathVariable("id") Long id){
		SpentLine spentLine = spentLineRepository.findById(id).get();
		spentLine.setDescription(newSpentLine.getDescription());
		spentLine.setName(newSpentLine.getName());
		spentLine.setAmount(newSpentLine.getAmount());
		spentLineRepository.save(spentLine);
		
	}
	
	@RequestMapping(value="/delete/{id}", method=RequestMethod.DELETE, produces=MediaType.APPLICATION_JSON_VALUE)
	public void deleteSpent(@PathVariable("id") Long id){
		spentRepository.deleteById(id);
	}
	
	@RequestMapping(value="/delete/spentLine/{id}", method=RequestMethod.DELETE, produces=MediaType.APPLICATION_JSON_VALUE)
	public void deleteSpentLine(@PathVariable("id") Long id){
		spentLineRepository.deleteById(id);
	}

	@RequestMapping(value="historique/{id}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Spent>  historiqueUser(@PathVariable("id") Long id){
		ApplicationUser user = userRepository.findById(id).get();
		return user.getUserSpents();
	}

}
