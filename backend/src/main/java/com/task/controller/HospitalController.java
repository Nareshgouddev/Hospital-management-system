package com.task.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.entity.Appointment;
import com.task.entity.Department;
import com.task.entity.Doctor;
import com.task.entity.User;
import com.task.service.AdminService;
import com.task.service.Appointmentservice;
import com.task.service.Departmentservice;
import com.task.service.Doctorservice;
import com.task.service.Userservice;

@RestController
@RequestMapping("/hospital")
public class HospitalController {

    @Autowired
    private Userservice userService;

    @Autowired
    private Doctorservice doctorService;

    @Autowired
    private Departmentservice departmentService;

    @Autowired
    private Appointmentservice appointmentService;

    @Autowired
    private AdminService adminService;

    // ─────────────────────────── USER ────────────────────────────────────────

    @PostMapping("/user/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User saved = userService.save(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedIn = userService.login(user.getAdminId(), user.getPassword());
        if (loggedIn == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok(loggedIn);
    }

    // ─────────────────────────── DOCTOR ──────────────────────────────────────

    @PostMapping("/doctor/save")
    public ResponseEntity<Doctor> saveDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.save(doctor));
    }

    @GetMapping("/doctor/all")
    public ResponseEntity<List<Doctor>> getDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Integer id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    /** Search doctors by speciality: GET /hospital/doctor/search?speciality=cardio */
    @GetMapping("/doctor/search")
    public ResponseEntity<List<Doctor>> searchDoctors(
            @RequestParam(required = false, defaultValue = "") String speciality) {
        if (speciality.isBlank()) {
            return ResponseEntity.ok(doctorService.getAllDoctors());
        }
        return ResponseEntity.ok(doctorService.searchBySpeciality(speciality));
    }

    @PutMapping("/doctor/update/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Integer id, @RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, doctor));
    }

    @DeleteMapping("/doctor/delete/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Integer id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted successfully");
    }

    // ─────────────────────────── DEPARTMENT ──────────────────────────────────

    @PostMapping("/department/save")
    public ResponseEntity<Department> saveDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.save(department));
    }

    @GetMapping("/department/all")
    public ResponseEntity<List<Department>> getDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/department/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Integer id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @PutMapping("/department/update/{id}")
    public ResponseEntity<Department> updateDepartment(
            @PathVariable Integer id, @RequestBody Department department) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, department));
    }

    @DeleteMapping("/department/delete/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Integer id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted successfully");
    }

    // ─────────────────────────── APPOINTMENT ─────────────────────────────────

    @PostMapping("/appointment/save")
    public ResponseEntity<Appointment> saveAppointment(@RequestBody Appointment appointment) {
        return ResponseEntity.ok(appointmentService.save(appointment));
    }

    /**
     * GET /hospital/appointment/all           → all appointments
     * GET /hospital/appointment/all?status=Pending  → filtered by status
     */
    @GetMapping("/appointment/all")
    public ResponseEntity<List<Appointment>> getAppointments(
            @RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(appointmentService.getAppointmentsByStatus(status));
        }
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/appointment/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    /** Search appointments by patient name: GET /hospital/appointment/search?name=John */
    @GetMapping("/appointment/search")
    public ResponseEntity<List<Appointment>> searchAppointments(
            @RequestParam(required = false, defaultValue = "") String name) {
        if (name.isBlank()) {
            return ResponseEntity.ok(appointmentService.getAllAppointments());
        }
        return ResponseEntity.ok(appointmentService.searchByPatientName(name));
    }

    @PutMapping("/appointment/status/{id}/{status}")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable Integer id,
            @PathVariable String status) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

    @DeleteMapping("/appointment/delete/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Integer id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully");
    }

    // ─────────────────────────── ADMIN ───────────────────────────────────────

    /** Dashboard stats: GET /hospital/admin/stats */
    @GetMapping("/admin/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    /** List all users: GET /hospital/admin/users */
    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /** Delete a user: DELETE /hospital/admin/users/{id} */
    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}