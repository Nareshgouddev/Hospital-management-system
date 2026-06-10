import React, { useState } from "react";

function Login({ goToRegister }) {
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem(loginData.id));

    if (user && user.password === loginData.password) {
      alert(`Login Successful\nRole: ${user.role}`);
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="User ID"
          value={loginData.id}
          onChange={(e) =>
            setLoginData({ ...loginData, id: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              password: e.target.value,
            })
          }
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?
        <span onClick={goToRegister}> Register</span>
      </p>
    </div>
  );
}

export default Login;