import React, { useContext, useState } from "react";
import axios from "axios";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const EnrollStudent = () => {
  // hooks
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { auth_token, admin_id } = useContext(AuthContext);

  if (!admin_id) {
    return <Login />;
  }

  const validateForm = () => {
    if (!firstName || !lastName || !email || !phone) {
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
      .post(
        "http://localhost:4000/students",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          admin_id: admin_id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "created") {
          setSuccess("Enrollment successful!");
          clearForm();
          navigate("/students");
        } else {
          setError("An error occurred during enrollment.");
        }
      })
      .catch((error) => {
        setError("Enrollment error: " + error.message);
      });
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="container-fluid">
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>EnrollStudent Form</legend>
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
          <button type="submit" className="btn btn-primary mt-4">
            Enroll
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default EnrollStudent;
