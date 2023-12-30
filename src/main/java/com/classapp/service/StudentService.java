package com.classapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.classapp.domain.Student;
import com.classapp.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;
	
	//get all students
	public List<Student> getAllStudents(){
		return studentRepository.findByIsActiveTrueOrderByIdDesc();
	}
	
	//save new student
		public String saveStudent(Student student) {
			try {
				student.setIsActive(true);
				student.setAddedDateTime(LocalDateTime.now());
				studentRepository.save(student);
				return "OK";
			} catch (Exception e) {
				return "Course Save not Completed : "+e.getMessage();
			}
		} 
		
		//update student
		public String updateStudent(Student student) {
			try {
				student.setLastUpdatedDateTime(LocalDateTime.now());
				studentRepository.save(student);
				return "OK";
			} catch (Exception e) {
				return "Course Update not Completed : "+e.getMessage();
			}
		}
		
		//delete student
		public String deleteStudent(Student student) {
			try {
				student.setIsActive(false);
				student.setDeletedDateTime(LocalDateTime.now());
				studentRepository.save(student);
				return "OK";
			} catch (Exception e) {
				return "Course Delete not Completed : "+e.getMessage();
			}
		}
}
