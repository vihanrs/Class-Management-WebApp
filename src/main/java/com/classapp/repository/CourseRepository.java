package com.classapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classapp.domain.Course;
@Repository
public interface CourseRepository extends JpaRepository<Course, Integer>{

}
