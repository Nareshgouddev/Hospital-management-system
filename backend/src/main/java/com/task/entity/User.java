package com.task.entity;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String adminId;

    private String password;

    private String role;

    public User() {
    }

	public User(Integer id, String Adminid, String password, String role) {
		super();
		this.id = id;
		this.adminId = Adminid;
		this.password = password;
		this.role = role;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAdminId() {
	    return adminId;
	}

	public void setAdminId(String adminId) {
	    this.adminId = adminId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + adminId + ", password=" + password + ", role=" + role + "]";
	}

    
    
}