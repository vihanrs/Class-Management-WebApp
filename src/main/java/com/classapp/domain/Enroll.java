package com.classapp.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "enroll")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enroll {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id",unique = true)
	private Integer id;
	
	@Column(name = "fee")
	@NotNull
	private Double fee;
	
	@Column(name = "date")
	@NotNull
	private LocalDateTime date;
	
	@Column(name = "status")
	@NotNull
	private String status;
	
	@ManyToOne
	@JoinColumn(name = "course_id",referencedColumnName = "id")
	private Course courseId;
	
	@ManyToOne
	@JoinColumn(name = "student_id",referencedColumnName = "id")
	private Student studentId;
}
