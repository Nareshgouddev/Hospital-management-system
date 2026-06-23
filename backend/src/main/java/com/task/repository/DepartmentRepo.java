package com.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.entity.Department;

@Repository
public interface DepartmentRepo
extends JpaRepository<Department,Integer>{

}