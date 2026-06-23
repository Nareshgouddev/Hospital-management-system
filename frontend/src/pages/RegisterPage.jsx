import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { registerUser } from "../api/hospitalApi";
import "../styles/admin.css";

function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (registerData.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);

    try {
      // Call the real backend API
      await registerUser({
        adminId: registerData.id,
        password: registerData.password,
        role: registerData.role,
      });

      // Also cache in localStorage for offline fallback
      localStorage.setItem(
        registerData.id,
        JSON.stringify({
          id: registerData.id,
          password: registerData.password,
          role: registerData.role,
        })
      );

      navigate("/admin/login", { replace: true });
    } catch (err) {
      // Fallback: store in localStorage if backend is offline
      const existing = localStorage.getItem(registerData.id);
      if (existing) {
        setError("An account with this ID already exists.");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        registerData.id,
        JSON.stringify({
          id: registerData.id,
          password: registerData.password,
          role: registerData.role,
        })
      );

      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="admin-auth-page">
      {/* Left visual panel */}
      <div className="admin-auth-page__visual">
        <div className="admin-auth-page__visual-content">
          <div className="admin-auth-page__visual-logo">
            <Activity />
          </div>
          <h1 className="admin-auth-page__visual-title">Wellness Village</h1>
          <p className="admin-auth-page__visual-text">
            Create your admin account to start managing hospital operations. Set
            up doctors, departments, and track appointments seamlessly.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="admin-auth-page__form-side">
        <div className="admin-auth-card">
          <div className="admin-auth-card__header">
            <h2 className="admin-auth-card__title">Create Account</h2>
            <p className="admin-auth-card__desc">
              Register a new admin account to get started
            </p>
          </div>

          {error && <div className="admin-auth-card__error">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="admin-auth-field">
              <label className="admin-auth-field__label">Admin ID</label>
              <input
                type="text"
                className="admin-auth-field__input"
                placeholder="Choose a unique admin ID"
                value={registerData.id}
                onChange={(e) =>
                  setRegisterData({ ...registerData, id: e.target.value })
                }
                required
              />
            </div>

            <div className="admin-auth-field">
              <label className="admin-auth-field__label">Password</label>
              <input
                type="password"
                className="admin-auth-field__input"
                placeholder="Create a password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="admin-auth-field">
              <label className="admin-auth-field__label">Confirm Password</label>
              <input
                type="password"
                className="admin-auth-field__input"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="admin-auth-field">
              <label className="admin-auth-field__label">Role</label>
              <select
                className="admin-auth-field__select"
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData({ ...registerData, role: e.target.value })
                }
              >
                <option value="Admin">Administrator</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <button
              type="submit"
              className="admin-auth-card__submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="admin-auth-card__footer">
            Already have an account?
            <Link to="/admin/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
