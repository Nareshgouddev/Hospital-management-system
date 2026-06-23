package com.task.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.entity.Appointment;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {

    List<Appointment> findByStatus(String status);

    List<Appointment> findByPatientFullNameContainingIgnoreCase(String name);

    long countByStatus(String status);
}