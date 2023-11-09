import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../../features/student/studentSlice";

function StudentView() {
  const dispatch = useDispatch();

  const { students, error, status } = useSelector((state) => state.students);

  console.log(error);

  useEffect(() => {
    dispatch(fetchStudents());
    if (status === "idle") {
    }
  }, []);

  return (
    <div>
      <h1>Student List</h1>

      {status === "pending" && <p>loading...</p>}
      {/* {status === "rejected" && <p>{error}</p>} */}

      {students?.map((student) => (
        <li>
          <div>
            <Link to={`/studentDetails/${student._id}`}>
              <p>
                <b>Name:</b>
                {student.name}
              </p>
              <p>
                <b>Age:</b> {student.age}
              </p>
              <p>
                <b>Gender:</b>
                {student.gender}
              </p>
              <p>
                <b>Marks:</b>
                {student.marks}
              </p>
              <p>
                <b>Garde:</b>
                {student.grade}
              </p>
              <p>
                <b>Attendance:</b>
                {student.attendance}
              </p>
            </Link>
          </div>
        </li>
      ))}

      <Link to="/studentForm/add/''">
        <h2>Add Student</h2>
      </Link>
    </div>
  );
}

export default StudentView;
