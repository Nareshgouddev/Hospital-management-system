package com.task.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.entity.Doctor;

@Repository
public interface DoctorRepo extends JpaRepository<Doctor, Integer> {

    List<Doctor> findBySpecialityContainingIgnoreCase(String speciality);
}