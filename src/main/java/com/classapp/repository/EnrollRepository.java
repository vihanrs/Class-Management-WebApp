package com.classapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classapp.domain.Enroll;
import com.classapp.domain.Student;
import com.classapp.domain.Course;


@Repository
public interface EnrollRepository extends JpaRepository<Enroll, Integer>{

	public List<Enroll> findByStudentIdAndStatusNot(Student student,String status);
	
	public List<Enroll> findByCourseIdAndStatusNot(Course courseId,String status);
}
