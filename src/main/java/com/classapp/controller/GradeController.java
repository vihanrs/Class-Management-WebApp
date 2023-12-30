package com.classapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.classapp.domain.Grade;
import com.classapp.service.GradeService;

@RestController
@RequestMapping(value = "grade")
public class GradeController {
	@Autowired
	private GradeService gradeService;
	
	@GetMapping(value = "/findall", produces = "application/json")
	public List<Grade> getAllGrades(){
		return gradeService.getAllGrades();
	}
}