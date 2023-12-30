package com.classapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classapp.domain.Grade;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer>{

}
