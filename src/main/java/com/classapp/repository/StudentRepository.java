package com.classapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classapp.domain.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>{
	

}
