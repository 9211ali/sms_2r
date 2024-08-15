import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
  const [student, setStudent] = useState({});
  const auth_token = localStorage.getItem("auth_token");
  const { student_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/students/${student_id}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "found") {
          setStudent(response.data.student);
        } else {
          console.error("Some error occurred at the Rails backend endpoint");
        }
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  });

  return (
    <div>
      <h2>Student Profile Information</h2>
      <p>ID: {student?.id}</p>
      <p>First Name: {student?.first_name}</p>
      <p>Last Name: {student?.last_name}</p>
      <p>Email: {student?.email}</p>
      <p>Phone: {student?.phone}</p>
    </div>
  );
};

export default StudentProfile;
