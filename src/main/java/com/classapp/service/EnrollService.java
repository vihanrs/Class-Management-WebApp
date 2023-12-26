package com.classapp.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.classapp.domain.Enroll;
import com.classapp.repository.EnrollRepository;

@Service
public class EnrollService {
	@Autowired
	private EnrollRepository enrollRepository;
	
	//save new enrollment
	public String saveEnrollment(Enroll enroll) {
		try {
			enroll.setDate(LocalDateTime.now());
			enroll.setStatus("Active");
			enrollRepository.save(enroll);
			return "OK";
		} catch (Exception e) {
			return "Enrollment not Completed "+e.getMessage();
		}
	}
	
	//delete enrollment
	public String deleteEnrollment(Enroll enroll) {
		try {
			enroll.setStatus("Deleted");
			enrollRepository.save(enroll);
			return "OK";
		} catch (Exception e) {
			return "Enrollment Delete not Completed "+e.getMessage();
		}
	}

}
