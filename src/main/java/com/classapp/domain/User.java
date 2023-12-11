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
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Integer id;

	@Column(name = "first_name")
	@NotNull
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "gender")
	@NotNull
	private String gender;

	@Column(name = "contact")
	@NotNull
	private String contact;
	
	@Column(name = "email")
	@NotNull
	private String email;

	@Column(name = "is_active")
	@NotNull
	private boolean isActive;

	@Column(name = "added_datetime")
	@NotNull
	private LocalDateTime addedDateTime;

	@Column(name = "lastupdated_datetime")
	private LocalDateTime lastUpdatedDateTime;

	@Column(name = "deleted_datetime")
	private LocalDateTime deletedDateTime;

	@ManyToOne
	@JoinColumn(name = "role_id",referencedColumnName = "id")
	private Role role_id;
}
