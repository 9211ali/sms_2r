import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  // hooks
  const [students, setStudents] = useState([]);
  // let { auth_token, admin_id } = useContext(AuthContext);
  const auth_token = localStorage.getItem("auth_token");
  const admin_id = localStorage.getItem("admin_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin_id) {
      return; // Exit early if admin_id is not present
    }

    axios
      .get("http://localhost:4000/students?admin_id=" + admin_id, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          setStudents(response.data.students);
        } else {
          console.error("Some error occurred at the Rails backend endpoint");
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const removeStudent = (student_id) => {
    axios
      .delete(`http://localhost:4000/students/${student_id}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          setStudents(students.filter((student) => student.id !== student_id));
        } else {
          console.error("Some error occurred at the Rails backend endpoint");
        }
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Phone#</th>
          <th scope="col">Email Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((student) => (
          <tr key={student.id}>
            <th scope="row">{student.id}</th>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>{student.phone}</td>
            <td>{student.email}</td>
            <td>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate(`/students/${student.id}`)}
              >
                Show
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate(`/students/${student.id}/edit`)}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeStudent(student.id)}
              >
                Destroy
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
