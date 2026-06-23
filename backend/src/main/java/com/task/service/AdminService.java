package com.task.service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.repository.AppointmentRepo;
import com.task.repository.DepartmentRepo;
import com.task.repository.DoctorRepo;
import com.task.repository.UserRepo;

@Service
public class AdminService {

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private DepartmentRepo departmentRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private UserRepo userRepo;

    /**
     * Returns dashboard summary counts used by AdminDashboard.jsx.
     * {
     *   doctorCount, departmentCount, appointmentCount,
     *   pendingCount, confirmedCount, cancelledCount, completedCount,
     *   userCount
     * }
     */
    public Map<String, Long> getDashboardStats() {
        Map<String, Long> stats = new LinkedHashMap<>();
        stats.put("doctorCount",      doctorRepo.count());
        stats.put("departmentCount",  departmentRepo.count());
        stats.put("appointmentCount", appointmentRepo.count());
        stats.put("pendingCount",     appointmentRepo.countByStatus("Pending"));
        stats.put("confirmedCount",   appointmentRepo.countByStatus("Confirmed"));
        stats.put("cancelledCount",   appointmentRepo.countByStatus("Cancelled"));
        stats.put("completedCount",   appointmentRepo.countByStatus("Completed"));
        stats.put("userCount",        userRepo.count());
        return stats;
    }
}
