package com.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.entity.Doctor;
import com.task.exception.ResourceNotFoundException;
import com.task.repository.DoctorRepo;

@Service
public class Doctorservice {

    @Autowired
    private DoctorRepo repo;

    public Doctor save(Doctor doctor) {
        return repo.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return repo.findAll();
    }

    public Doctor getDoctorById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", id));
    }

    public List<Doctor> searchBySpeciality(String speciality) {
        return repo.findBySpecialityContainingIgnoreCase(speciality);
    }

    public Doctor updateDoctor(Integer id, Doctor incoming) {
        Doctor existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", id));
        existing.setDoctorName(incoming.getDoctorName());
        existing.setSpeciality(incoming.getSpeciality());
        existing.setEmail(incoming.getEmail());
        existing.setDescription(incoming.getDescription());
        return repo.save(existing);
    }

    public void deleteDoctor(Integer id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Doctor", id);
        }
        repo.deleteById(id);
    }
}