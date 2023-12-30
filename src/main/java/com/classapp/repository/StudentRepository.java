package com.classapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classapp.domain.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

	public List<Student> findByIsActiveTrueOrderByIdDesc();
}
