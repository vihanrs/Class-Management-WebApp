package com.classapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.classapp.domain.Subject;
import com.classapp.repository.SubjectRepository;

@Service
public class SubjectService {
	@Autowired
	private SubjectRepository subjectRepository;
	
	public List<Subject> getAllSubjects(){
		return subjectRepository.findAll();
	}
}
