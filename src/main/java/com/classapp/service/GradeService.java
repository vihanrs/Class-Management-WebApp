package com.classapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.classapp.domain.Grade;
import com.classapp.repository.GradeRepository;

@Service
public class GradeService {
	@Autowired
	private GradeRepository gradeRepository;
	
	public List<Grade> getAllGrades(){
		return gradeRepository.findAll();
	}

}
