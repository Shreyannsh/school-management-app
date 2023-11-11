import "./studentDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { deleteStudentAsync } from "../../../features/student/studentSlice";

function StudentDetails() {
  const { id } = useParams();

  const particularStudent = useSelector((state) =>
    state.students.students.find((student) => student._id === id)
  );

  const dispatch = useDispatch();

  // const particularStudent = students.find((student) => student._id === id);
  console.log(particularStudent);

  if (!particularStudent) {
    return <div>Student not found.</div>;
  }

  return (
    <div className="parent">
      <h1>Student Details</h1>
      <div className="studentDetailPage">
        <div className="subSection1">
          <p>
            <b>Name:</b>
            {particularStudent.name}
          </p>
          <p>
            <b>Age:</b> {particularStudent.age} years
          </p>
          <p>
            <b>Attendance:</b>
            {particularStudent.attendance}
          </p>
        </div>
        <div className="subSection2">
          <p>
            <b>Marks:</b>
            {particularStudent.marks}
          </p>

          <p>
            <b>Garde:</b>
            {particularStudent.grade}
          </p>
          <p>
            <b>Gender:</b>
            {particularStudent.gender}
          </p>
        </div>
      </div>
      <div className="btnSection">
        <div>
          <Link
            className="editStudentLink"
            to={`/studentForm/edit/${particularStudent._id}`}
            state={particularStudent}
          >
            Edit Student Details
          </Link>
        </div>
        <div>
          <button
            className="deleteBtn"
            onClick={() => dispatch(deleteStudentAsync(id))}
          >
            Delete Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
