package com.classapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.classapp.domain.Student;
import com.classapp.service.StudentService;

@RestController
@RequestMapping(value = "/student") // add class level mapping
public class StudentController {

	@Autowired
	private StudentService studentService;

	// create UI service [/student -- return course UI]
	@GetMapping
	public ModelAndView StudentUI() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("student.html");
		return modelAndView;
	}

	// get all courses
	@GetMapping(value = "/findall", produces = "application/json")
	public List<Student> getAllCourses() {
		return studentService.getAllStudents();
	}

	// save course
	@PostMapping
	public String saveCourse(@RequestBody Student student) {
		System.out.println(student.getCallingName());
		return studentService.saveStudent(student);
	}

	// update course
	@PutMapping
	public String updateCourse(@RequestBody Student student) {
		return studentService.updateStudent(student);
	}

	// delete course
	@DeleteMapping
	public String deleteCourse(@RequestBody Student student) {
		return studentService.deleteStudent(student);
	}

}
