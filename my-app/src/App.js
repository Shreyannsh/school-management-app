import ClassView from "./components/class/class";
import School from "./components/school/school";
import StudentDetails from "./components/student/studentDetails/studentDetails";
import StudentForm from "./components/student/studentForm/studentForm";
import StudentView from "./components/student/studentView/studentView";
import "./App.css";

import { Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <nav className="navigationBar">
        <div className="title">
          <img
            className="appLogo"
            src="https://play-lh.googleusercontent.com/mnhA6D5xATymfh_B4xrhXCB6QBM5mR2_16UQkPeE8NZOQ4oaIPWEysrbP04UyhK3prs"
            alt="logo"
          />
          <h1 className="appTitle"> School Management App</h1>
        </div>
        <div className="navLinks">
          <Link className="link" to="/">
            Students
          </Link>
          <Link className="link" to="/class">
            Class
          </Link>
          <Link className="link" to="/school">
            School
          </Link>
        </div>
      </nav>
      <div className="allPages">
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/studentDetails/:id" element={<StudentDetails />} />
          <Route path="/studentForm/:mode/:id" element={<StudentForm />} />
          <Route path="/class" element={<ClassView />} />
          <Route path="/school" element={<School />} />
        </Routes>
      </div>
    </div>
  );
}
