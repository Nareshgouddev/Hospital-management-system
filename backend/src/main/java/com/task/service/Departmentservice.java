package com.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.entity.Department;
import com.task.exception.ResourceNotFoundException;
import com.task.repository.DepartmentRepo;

@Service
public class Departmentservice {

    @Autowired
    private DepartmentRepo repo;

    public Department save(Department department) {
        return repo.save(department);
    }

    public List<Department> getAllDepartments() {
        return repo.findAll();
    }

    public Department getDepartmentById(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", id));
    }

    public Department updateDepartment(Integer id, Department incoming) {
        Department existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", id));
        existing.setDepartmentName(incoming.getDepartmentName());
        existing.setDescription(incoming.getDescription());
        return repo.save(existing);
    }

    public void deleteDepartment(Integer id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Department", id);
        }
        repo.deleteById(id);
    }
}