import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    axios
      .post("http://localhost:4000/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          setSuccess("Login successful!");
          clearForm();
          console.log("Login hu gaya ha .........");
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("admin_id", response.data.admin_id);
          navigate("/dashboard");
        } else {
          setError("An error occurred during Login.");
        }
      })
      .catch((error) => {
        setError("Login error: " + error.message);
      });
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <legend>Login Form</legend>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="form-group">
          <label htmlFor="email">
            Email <sup>*</sup>
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password <sup>*</sup>
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Login now
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
