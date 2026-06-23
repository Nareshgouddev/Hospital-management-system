package com.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.entity.Appointment;
import com.task.exception.ResourceNotFoundException;
import com.task.repository.AppointmentRepo;

@Service
public class Appointmentservice {

    @Autowired
    private AppointmentRepo repo;

    public Appointment save(Appointment appointment) {
        appointment.setStatus("Pending");
        return repo.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return repo.findAll();
    }

    public List<Appointment> getAppointmentsByStatus(String status) {
        return repo.findByStatus(status);
    }

    public List<Appointment> searchByPatientName(String name) {
        return repo.findByPatientFullNameContainingIgnoreCase(name);
    }

    public Appointment getAppointmentById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", id));
    }

    public Appointment updateStatus(Integer id, String status) {
        Appointment appt = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", id));
        appt.setStatus(status);
        return repo.save(appt);
    }

    public void deleteAppointment(Integer id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Appointment", id);
        }
        repo.deleteById(id);
    }
}