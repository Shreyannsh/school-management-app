import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";

import {
  addStudentAsync,
  updateStudentAsync,
} from "../../../features/student/studentSlice";

function StudentForm() {
  const dispatch = useDispatch();

  const { state } = useLocation();

  const student = state;

  const { mode, id } = useParams();

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "boy",
    attendance: "",
    marks: "",
  });

  const handleAddStudent = () => {
    if (mode === "edit") {
      dispatch(updateStudentAsync({ id, studentInfo }));
    } else {
      dispatch(addStudentAsync(studentInfo));
      setStudentInfo({
        name: "",
        age: "",
        grade: "",
        gender: "boy",
        attendance: "",
        marks: "",
      });
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setStudentInfo({
        name: student?.name,
        age: student?.age,
        grade: student?.grade,
        gender: student?.gender,
        attendance: student?.attendance,
        marks: student?.marks,
      });
    }
  }, [mode]);

  return (
    <div>
      <h1>{mode === "edit" ? "Edit Student" : "Add Student"}</h1>
      <label>
        Name:
        <input
          type="text"
          placeholder="student name"
          value={studentInfo.name}
          onChange={(e) =>
            setStudentInfo({ ...studentInfo, name: e.target.value })
          }
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          placeholder="student Age"
          value={studentInfo.age}
          onChange={(e) =>
            setStudentInfo({ ...studentInfo, age: e.target.value })
          }
        />
      </label>
      <div>
        <label>
          Gender:
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, gender: e.target.value })
            }
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, gender: e.target.value })
            }
          />
          Female
        </label>
        <label>
          Grade:
          <input
            type="text"
            value={studentInfo.grade}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, grade: e.target.value })
            }
          />
        </label>
      </div>
      {mode === "edit" && (
        <>
          <label>
            Attendance
            <input
              type="number"
              placeholder="attendance"
              value={studentInfo.attendance}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, attendance: e.target.value })
              }
            />
          </label>
          <label>
            Marks:
            <input
              type="number"
              placeholder="marks"
              value={studentInfo.marks}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, marks: e.target.value })
              }
            />
          </label>
        </>
      )}
      <div>
        <button onClick={() => handleAddStudent()}>
          {mode === "edit" ? "Edit Student" : "Add Student"}
        </button>
      </div>
    </div>
  );
}

export default StudentForm;
