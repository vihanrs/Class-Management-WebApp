package com.classapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classapp.domain.Enroll;

@Repository
public interface EnrollRepository extends JpaRepository<Enroll, Integer>{

}
