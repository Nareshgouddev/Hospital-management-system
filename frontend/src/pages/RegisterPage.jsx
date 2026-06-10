import React, { useState } from "react";

function RegisterPage({ goToLogin }) {
  const [registerData, setRegisterData] = useState({
    id: "",
    password: "",
    role: "Doctor",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem(
      registerData.id,
      JSON.stringify(registerData)
    );

    alert("Registration Successful");
    goToLogin();
  };

  return (
    <div className="form-card">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="User ID"
          value={registerData.id}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              id: e.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              password: e.target.value,
            })
          }
          required
        />

        <select
          value={registerData.role}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              role: e.target.value,
            })
          }
        >
          <option value="Doctor">Doctor</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?
        <span onClick={goToLogin}> Login</span>
      </p>
    </div>
  );
}

export default RegisterPage;