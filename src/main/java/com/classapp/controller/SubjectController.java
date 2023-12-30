package com.classapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.classapp.domain.Subject;
import com.classapp.service.SubjectService;

@RestController
@RequestMapping(value = "subject")
public class SubjectController {
	@Autowired
	private SubjectService subjectService;
	
	@GetMapping(value = "/findall", produces = "application/json")
	public List<Subject> getAllSubjects(){
		return subjectService.getAllSubjects();
	}
}
