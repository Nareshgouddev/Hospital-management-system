import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { loginUser } from "../api/hospitalApi";
import "../styles/admin.css";

function Login() {
  const [loginData, setLoginData] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the real backend API
      const user = await loginUser(loginData.id, loginData.password);

      if (!user || !user.role) {
        setError("Invalid credentials. Please check your ID and password.");
        setLoading(false);
        return;
      }

      if (user.role !== "Admin" && user.role !== "Doctor") {
        setError("Access denied. Valid role required.");
        setLoading(false);
        return;
      }

      // Store session in localStorage
      localStorage.setItem(
        "admin:session",
        JSON.stringify({ id: user.adminId, role: user.role, dbId: user.id })
      );

      navigate("/admin", { replace: true });
    } catch (err) {
      // Backend returned 401 or is offline — fallback to localStorage
      let user = null;
      try {
        const raw = localStorage.getItem(loginData.id);
        user = raw ? JSON.parse(raw) : null;
      } catch (_) {
        user = null;
      }

      if (!user || user.password !== loginData.password) {
        setError(
          err.message.includes("Invalid")
            ? "Invalid credentials. Please check your ID and password."
            : `Login failed: ${err.message}`
        );
        setLoading(false);
        return;
      }

      if (user.role !== "Admin" && user.role !== "Doctor") {
        setError("Access denied. Valid role required.");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "admin:session",
        JSON.stringify({ id: user.id, role: user.role })
      );
      navigate("/admin", { replace: true });
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
            Manage your hospital operations efficiently with our comprehensive
            admin dashboard. Monitor appointments, manage doctors, and track
            departments all in one place.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="admin-auth-page__form-side">
        <div className="admin-auth-card">
          <div className="admin-auth-card__header">
            <h2 className="admin-auth-card__title">Welcome Back</h2>
            <p className="admin-auth-card__desc">
              Sign in to your admin account to continue
            </p>
          </div>

          {error && <div className="admin-auth-card__error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="admin-auth-field">
              <label className="admin-auth-field__label">Admin ID</label>
              <input
                type="text"
                className="admin-auth-field__input"
                placeholder="Enter your admin ID"
                value={loginData.id}
                onChange={(e) =>
                  setLoginData({ ...loginData, id: e.target.value })
                }
                required
              />
            </div>

            <div className="admin-auth-field">
              <label className="admin-auth-field__label">Password</label>
              <input
                type="password"
                className="admin-auth-field__input"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="admin-auth-card__submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="admin-auth-card__footer">
            Don't have an account?
            <Link to="/admin/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
