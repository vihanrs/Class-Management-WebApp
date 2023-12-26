package com.classapp.domain;

import java.time.LocalDate;
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
@Table(name = "Student")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Integer id;
	
	@Column(name = "full_name")
	@NotNull
	private String fullName;

	@Column(name = "calling_name")
	@NotNull
	private String callingName;

	@Column(name = "gender")
	@NotNull
	private String gender;

	@Column(name = "dob")
	@NotNull
	private LocalDate dob;

	@Column(name = "contact")
	@NotNull
	private String contact;

	@Column(name = "contact_two")
	private String contactTwo;

	@Column(name = "address")
	private String address;

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
	@JoinColumn(name = "user_id",referencedColumnName = "id")
	private User userId;
}
