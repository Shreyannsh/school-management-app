import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateSchoolStats } from "../../features/school/schoolSlice";

function School() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const { totalStudents, averageAttendance, averageMarks, highestMarks } =
    useSelector((state) => state.school);

  useEffect(() => {
    const totalStudents = students.length;
    const totalAttendance = students.reduce(
      (acc, crr) => (crr.attendance ? acc + crr.attendance : acc + 0),
      0
    );
    const averageAttendance = totalAttendance / totalStudents;
    const totalMarks = students.reduce(
      (acc, crr) => (acc = crr.marks ? acc + crr.marks : acc + 0),
      0
    );

    const averageMarks = totalMarks / totalStudents;

    const highestMarks = students.reduce(
      (acc, crr) => {
        acc = crr.marks && crr.marks > acc.marks ? crr : acc;
        return acc;
      },
      { marks: 0 }
    );
    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        highestMarks,
      })
    );
  }, []);

  return (
    <div>
      <h1>School View</h1>

      <p>
        <b>Total Students : </b>
        {totalStudents}
      </p>
      <p>
        <b>Average Attendance : </b>
        {averageAttendance.toFixed(2)}
      </p>
      <p>
        <b>Average Marks</b>
        {averageMarks.toFixed(2)}
      </p>
      <p>
        <b> Highest Marks</b>
        {highestMarks.name} <i>{highestMarks.marks} </i>
      </p>
    </div>
  );
}

export default School;
