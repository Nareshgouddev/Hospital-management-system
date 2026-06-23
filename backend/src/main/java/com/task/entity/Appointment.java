package com.task.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appointmentId;

    private String patientFullName;

    private String phoneNumber;

    private String email;

    private String gender;

    private LocalDate appointmentDate;

    private LocalTime appointmentTime;

    private String message;

    private String status;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public Appointment() {
    }

	public Appointment(Integer appointmentId, String patientFullName, String phoneNumber, String email, String gender,
			LocalDate appointmentDate, LocalTime appointmentTime, String message, String status, Doctor doctor) {
		super();
		this.appointmentId = appointmentId;
		this.patientFullName = patientFullName;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.gender = gender;
		this.appointmentDate = appointmentDate;
		this.appointmentTime = appointmentTime;
		this.message = message;
		this.status = status;
		this.doctor = doctor;
	}

	public Integer getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(Integer appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getPatientFullName() {
		return patientFullName;
	}

	public void setPatientFullName(String patientFullName) {
		this.patientFullName = patientFullName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(LocalDate appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public LocalTime getAppointmentTime() {
		return appointmentTime;
	}

	public void setAppointmentTime(LocalTime appointmentTime) {
		this.appointmentTime = appointmentTime;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	@Override
	public String toString() {
		return "Appointment [appointmentId=" + appointmentId + ", patientFullName=" + patientFullName + ", phoneNumber="
				+ phoneNumber + ", email=" + email + ", gender=" + gender + ", appointmentDate=" + appointmentDate
				+ ", appointmentTime=" + appointmentTime + ", message=" + message + ", status=" + status + ", doctor="
				+ doctor + "]";
	}
    

    // Getters Setters
}