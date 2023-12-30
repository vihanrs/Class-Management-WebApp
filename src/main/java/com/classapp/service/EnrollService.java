package com.classapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.classapp.domain.Course;
import com.classapp.domain.Enroll;
import com.classapp.domain.Student;
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
			enroll.setStatus("Removed");
			enrollRepository.save(enroll);
			return "OK";
		} catch (Exception e) {
			return "Enrollment Delete not Completed "+e.getMessage();
		}
	}
	
	//update enrollment (only fee)
	public String updateEnrollment(Enroll enroll) {
		try {
			enrollRepository.save(enroll);
			return "OK";
		} catch (Exception e) {
			return "Enrollment Update not Completed "+e.getMessage();
		}
	}
	
	//get course list for the selected student
	public List<Enroll> getCourseListByStudent(Student student){
		return enrollRepository.findByStudentIdAndStatusNot(student,"Removed");
	}
	
	//get student list for the selected course
	public List<Enroll> getStudentListByCourse(Course course){
		return enrollRepository.findByCourseIdAndStatusNot(course,"Removed");
	}

}
