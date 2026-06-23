package com.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.entity.User;
import com.task.exception.ResourceNotFoundException;
import com.task.repository.UserRepo;

@Service
public class Userservice {

    @Autowired
    private UserRepo Userrepo;

    public User save(User user) {
        if (user.getAdminId() == null || user.getAdminId().isBlank()) {
            throw new IllegalArgumentException("Admin ID must not be blank");
        }
        if (user.getPassword() == null || user.getPassword().length() < 4) {
            throw new IllegalArgumentException("Password must be at least 4 characters");
        }
        return Userrepo.save(user);
    }

    public User login(String adminid, String password) {
        User dbUser = Userrepo.findByAdminId(adminid);
        if (dbUser != null && dbUser.getPassword().equals(password)) {
            return dbUser;
        }
        return null;
    }

    public List<User> getAllUsers() {
        return Userrepo.findAll();
    }

    public void deleteUser(Integer id) {
        if (!Userrepo.existsById(id)) {
            throw new ResourceNotFoundException("User", id);
        }
        Userrepo.deleteById(id);
    }
}
