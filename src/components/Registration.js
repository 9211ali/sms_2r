import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  // hooks
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (!firstName || !lastName || !email || !phone || !password) {
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
      .post("http://localhost:4000/registrations", {
        admin: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          password: password,
        },
      })
      .then((response) => {
        if (response.data.status === "created") {
          setSuccess("Registration successful!");
          clearForm();
        } else {
          setError("An error occurred during registration.");
        }
      })
      .catch((error) => {
        setError("Registration error: " + error.message);
      });
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <div className="container-fluid">
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>Registration Form</legend>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="form-group">
            <label htmlFor="firstName">
              First Name<sup>*</sup>
            </label>
            <input
              className="form-control"
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <sup>*</sup>
            </label>
            <input
              className="form-control"
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
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
            <label htmlFor="phone">
              Phone <sup>*</sup>
            </label>
            <input
              className="form-control"
              type="phone"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 3024389214"
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
            Create Account
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Registration;
