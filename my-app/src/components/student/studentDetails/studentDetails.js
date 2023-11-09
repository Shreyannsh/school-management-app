import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { deleteStudentAsync } from "../../../features/student/studentSlice";

function StudentDetails() {
  const students = useSelector((state) => state.students.students);

  const dispatch = useDispatch();

  const { id } = useParams();

  const particularStudent = students.find((student) => student._id === id);

  return (
    <div>
      <p>
        <b>Name:</b>
        {particularStudent.name}
      </p>
      <p>
        <b>Age:</b> {particularStudent.age}
      </p>
      <p>
        <b>Gender:</b>
        {particularStudent.gender}
      </p>
      <p>
        <b>Marks:</b>
        {particularStudent.marks}
      </p>
      <p>
        <b>Garde:</b>
        {particularStudent.grade}
      </p>
      <p>
        <b>Attendance:</b>
        {particularStudent.attendance}
      </p>
      <div>
        <Link
          to={`/studentForm/edit/${particularStudent._id}`}
          state={particularStudent}
        >
          Edit Student Details
        </Link>

        <div>
          <button onClick={() => dispatch(deleteStudentAsync(id))}>
            Delete Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
