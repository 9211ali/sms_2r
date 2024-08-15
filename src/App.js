import "bootstrap/dist/css/bootstrap.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import EnrollStudent from "./components/students/EnrollStudent";
import HireTeacher from "./components/teachers/HireTeacher";
import AddSubject from "./components/subjects/AddSubject";
import StudentList from "./components/students/StudentList";
import NoPage from "./components/NoPage";
import StudentProfile from "./components/students/StudentProfile";
import EditStudentProfile from "./components/students/EditStudentProfile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enroll_student" element={<EnrollStudent />} />
        <Route path="/hire_teacher" element={<HireTeacher />} />
        <Route path="/add_subject" element={<AddSubject />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:student_id" element={<StudentProfile />} />
        <Route
          path="/students/:student_id/edit"
          element={<EditStudentProfile />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
