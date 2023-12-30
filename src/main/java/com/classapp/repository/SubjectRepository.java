package com.classapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classapp.domain.Subject;
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer>{

}
