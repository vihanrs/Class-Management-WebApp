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

import com.classapp.domain.Course;
import com.classapp.service.CourseService;

@RestController
@RequestMapping(value = "/course") // add class level mapping
public class CourseController {
	@Autowired // inject CourseService object into courseService variable
	private CourseService courseService;

	// create UI service [/employee -- return course UI]
	@GetMapping
	public ModelAndView CourseUI() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("course.html");
		return modelAndView;
	}

	// get all courses
	@GetMapping(value = "/findall", produces = "application/json")
	public List<Course> getAllCourses() {
		return courseService.getAllCourses();
	}

	// save course
	@PostMapping
	public String saveCourse(@RequestBody Course course) {
		return courseService.saveCourse(course);
	}

	// update course
	@PutMapping
	public String updateCourse(@RequestBody Course course) {
		return courseService.updateCourse(course);
	}

	// delete course
	@DeleteMapping
	public String deleteCourse(@RequestBody Course course) {
		return courseService.deleteCourse(course);
	}

}
