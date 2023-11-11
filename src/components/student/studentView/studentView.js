import "./studentView.css";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { setIsActive } from "../../../features/student/studentSlice";
import { fetchStudents } from "../../../features/student/studentSlice";

function StudentView() {
  const dispatch = useDispatch();

  const { students, status } = useSelector((state) => state.students);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
    dispatch(setIsActive("student"));
  }, [dispatch]);

  return (
    <div>
      <h1>Student List</h1>
      <div className="addStudentComponent">
        <Link className="addStudentLink" to="/studentForm/add/''">
          <h2>
            <IoPersonAddOutline className="icon" />
            Add Student
          </h2>
        </Link>
      </div>

      <div className="studentList">
        {students?.map((student) => (
          <li key={student._id}>
            <div className="studentProfile">
              <Link
                className="studentDetailLink"
                to={`/studentDetails/${student._id}`}
              >
                <p className="value">
                  name:
                  <b className="studentText">{student.name}</b>
                </p>
                <p className="value">
                  age:
                  <b className="studentText">{student.age}</b>
                </p>

                <p className="value">
                  garde:
                  <b className="studentText">{student.grade}</b>
                </p>
              </Link>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default StudentView;
