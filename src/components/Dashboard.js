import React, { useContext, useState } from "react";
import Login from "./Login";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  // hooks
  const { auth_token } = useContext(AuthContext);
  // const auth_token = localStorage.getItem("auth_token");
  console.log("Auth Token from Context:", auth_token);
  if (!auth_token) {
    return <Login />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Students</h4>
          <NavLink to="/enroll_student" className="btn btn-primary">
            Enroll Student
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
