package com.classapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.classapp.domain.Course;
import com.classapp.repository.CourseRepository;

@Service
public class CourseService {
	@Autowired // inject CourseRepository object into courseRepository variable
	private CourseRepository courseRepository;
	
	//get all courses
	public List<Course> getAllCourses(){
		return courseRepository.findAll(Sort.by(Direction.DESC, "id"));
	}
	
	//save new course
	public String saveCourse(Course course) {
		try {
			course.setActive(true);
			course.setAddedDateTime(LocalDateTime.now());
			courseRepository.save(course);
			return "OK";
		} catch (Exception e) {
			return "Course Save not Completed : "+e.getMessage();
		}
	} 
	
	//update course
	public String updateCourse(Course course) {
		try {
			course.setLastUpdatedDateTime(LocalDateTime.now());
			courseRepository.save(course);
			return "OK";
		} catch (Exception e) {
			return "Course Update not Completed : "+e.getMessage();
		}
	}
	
	//delete course
	public String deleteCourse(Course course) {
		try {
			course.setActive(false);
			course.setDeletedDateTime(LocalDateTime.now());
			courseRepository.save(course);
			return "OK";
		} catch (Exception e) {
			return "Course Delete not Completed : "+e.getMessage();
		}
	}

}
