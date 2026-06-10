import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, LogIn } from "lucide-react";
import "../styles/admin.css";

function Login() {
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // simulate brief delay for UX
    setTimeout(() => {
      let user = null;
      try {
        const raw = localStorage.getItem(loginData.id);
        user = raw ? JSON.parse(raw) : null;
      } catch (err) {
        user = null;
      }

      if (!user || user.password !== loginData.password) {
        setError("Invalid credentials. Please check your ID and password.");
        setLoading(false);
        return;
      }

      if (user.role !== "Admin") {
        setError("Access denied. This account does not have admin privileges.");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "admin:session",
        JSON.stringify({ id: user.id, role: "Admin" })
      );
      navigate("/admin", { replace: true });
    }, 600);
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
            Manage your hospital operations efficiently with our comprehensive admin dashboard. Monitor appointments, manage doctors, and track departments all in one place.
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
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
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
