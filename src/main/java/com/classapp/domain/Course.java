package com.classapp.domain;

import java.time.LocalDateTime;
import java.time.LocalTime;

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
@Table(name = "course")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id",unique = true)
	private Integer id;
	
	@Column(name = "default_day")
	@NotNull
	private String defaultDay;
	
	@Column(name = "from_time")
	@NotNull
	private LocalTime fromTime;
	
	@Column(name = "to_time")
	@NotNull
	private LocalTime toTime;
	
	@Column(name = "default_fee")
	@NotNull
	private double defaultFee;
	
	@Column(name = "has_fixed_time")
	@NotNull
	private boolean hasFixedTime; 
	
	@Column(name = "is_active")
	@NotNull
	private Boolean isActive;
	
	@Column(name = "added_datetime")
	@NotNull
	private LocalDateTime addedDateTime;
	
	@Column(name = "lastupdated_datetime")
	private LocalDateTime lastUpdatedDateTime;
	
	@Column(name = "deleted_datetime")   
	private LocalDateTime deletedDateTime;
	
	@ManyToOne
	@JoinColumn(name = "grade_id",referencedColumnName = "id")
	private Grade gradeId;
	
	@ManyToOne
	@JoinColumn(name = "subject_id",referencedColumnName = "id")
	private Subject subjectId;
	
	@ManyToOne
	@JoinColumn(name = "user_id",referencedColumnName = "id")
	private User userId;
}
