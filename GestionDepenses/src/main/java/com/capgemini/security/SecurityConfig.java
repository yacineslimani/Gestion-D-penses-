package com.capgemini.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;



public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private AuthenticationEntryPoint authEntryPoint;

	@Autowired
	public void globalConfig(AuthenticationManagerBuilder auth) throws Exception{
		auth.inMemoryAuthentication().withUser("yacine").password("{noop}yacine").roles("ADMIN");
	}

	@Override
	protected void	configure(HttpSecurity http) throws Exception{
		http.csrf().disable().authorizeRequests()
		.antMatchers("/user/curent").permitAll()
		.anyRequest().authenticated()
		.and().httpBasic()
		.authenticationEntryPoint(authEntryPoint);
	}
}
