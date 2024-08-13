import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Dashboard from "./Dashboard";

const Home = () => {
  const { auth_token } = useContext(AuthContext);

  return <>{auth_token ? <Dashboard /> : <h2>School Management System</h2>}</>;
};

export default Home;
