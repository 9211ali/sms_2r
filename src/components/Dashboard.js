import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  // hooks
  // const { auth_token } = useContext(AuthContext);
  const auth_token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  if (!auth_token) {
    navigate("/login");
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Students</h4>
          <NavLink to="/enroll_student" className="btn btn-primary">
            Enroll Student
          </NavLink>
          <NavLink to="/students" className="btn btn-primary m-3">
            Enrolled Students
          </NavLink>
        </div>
        <div className="col">
          <h4>Teachers</h4>
          <NavLink to="/hire_teacher" className="btn btn-primary">
            Hire Teacher
          </NavLink>
        </div>
        <div className="col">
          <h4>Subjects</h4>
          <NavLink to="/add_subject" className="btn btn-primary">
            Add Subject
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
