import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Login from "../Login";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const EditStudentProfile = () => {
  // hooks
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { student_id } = useParams();

  // const { auth_token, admin_id } = useContext(AuthContext);
  const auth_token = localStorage.getItem("auth_token");
  const admin_id = localStorage.getItem("admin_id");

  const validateForm = () => {
    if (!firstName || !lastName || !email || !phone) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/students/${student_id}/edit`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "found") {
          const student = response.data.student;
          setFirstName(student.first_name);
          setLastName(student.last_name);
          setEmail(student.email);
          setPhone(student.phone);
          console.log('Student info = ', student);
        } else {
          console.error("Some error occurred at the Rails backend endpoint");
        }
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  }, [student_id]);

  if (!admin_id) {
    return <Login />;
  }

  const submitForm = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    axios
      .put(
        `http://localhost:4000/students/${student_id}`,
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
        if (response.data.status === "ok") {
          setSuccess("Profile updated successfully!");
          navigate("/students");
        } else {
          setError("An error occurred during the update.");
        }
      })
      .catch((error) => {
        setError("Update error: " + error.message);
      });
  };

  return (
    <div className="container-fluid">
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>Edit Student Profile</legend>
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
              Last Name<sup>*</sup>
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
              Email<sup>*</sup>
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
              Phone<sup>*</sup>
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
            Update
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default EditStudentProfile;
