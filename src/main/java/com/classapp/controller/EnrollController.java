package com.classapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.classapp.domain.Course;
import com.classapp.domain.Enroll;
import com.classapp.domain.Student;
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
	
	//update enrollment
	@PutMapping
	public String updateEnroll(@RequestBody Enroll enroll) {
		return enrollService.updateEnrollment(enroll);
	}
	
	//delete enrollment
	@DeleteMapping
	public String deleteEnroll(@RequestBody Enroll enroll) {
		return enrollService.deleteEnrollment(enroll);
	}

	//get course list by student
	@GetMapping(path = "/findCoursesByStudent/{studentId}", produces = "application/json")
	public List<Enroll> getCourseListByStudent(@PathVariable Integer studentId){
		Student student = new Student();
		student.setId(studentId);
		return enrollService.getCourseListByStudent(student);
	}
	
	//get student list by course
	@GetMapping(path = "/findstudentsBycourse/{courseId}", produces = "application/json")
	public List<Enroll> getStudentListByCourse(@PathVariable Integer courseId){
		Course course = new Course();
		course.setId(courseId);
		return enrollService.getStudentListByCourse(course);
	}
}
