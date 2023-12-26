package com.classapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.classapp.domain.Enroll;
import com.classapp.service.EnrollService;

@RestController
@RequestMapping(value = "/enroll")
public class EnrollController {
	@Autowired
	private EnrollService enrollService;

	// create UI service [/employee -- return course UI]
	@GetMapping
	public ModelAndView EnrollUI() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("enroll.html");
		return modelAndView;
	}
	
	//save new enrollment
	@PostMapping
	public String saveEnroll(@RequestBody Enroll enroll) {
		return enrollService.saveEnrollment(enroll);
	}
	
	//delete enrollment
	@DeleteMapping
	public String deleteEnroll(@RequestBody Enroll enroll) {
		return enrollService.deleteEnrollment(enroll);
	}
}
