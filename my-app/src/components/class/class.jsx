import { useDispatch, useSelector } from "react-redux";

import {
  setFilter,
  setSortBy,
  fetchStudents,
} from "../../features/student/studentSlice";
import { useEffect } from "react";

function ClassView() {
  const dispatch = useDispatch();

  const { students, filter, sortBy } = useSelector((state) => state.students);

  const filterHandler = students.filter(({ gender }) => {
    if (filter === "all") return true;
    return gender === filter;
  });

  const sortByHandler = [...filterHandler].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "age") return a.age - b.age;
    if (sortBy === "marks") return b.marks - a.marks;
    if (sortBy === "attendance") return b.attendance - a.attendance;
    return 0;
  });

  console.log(sortByHandler);

  const handleFilterByFunction = (text) => {
    console.log(text);
    dispatch(setFilter(text));
  };

  const handleSortByFunction = (text) => {
    console.log(text);
    dispatch(setSortBy(text));
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <label>
        Filter By -
        <select onChange={(e) => handleFilterByFunction(e.target.value)}>
          <option value="all">All</option>
          <option value="Male">Boys</option>
          <option value="Female">Girls</option>
        </select>
      </label>

      <label>
        Sort By -
        <select onChange={(e) => handleSortByFunction(e.target.value)}>
          <option value="name">name</option>
          <option value="age"> Age</option>
          <option value="marks">Marks</option>
          <option value="attendance">Attendance</option>
        </select>
      </label>

      <h1>Class View</h1>
      <table>
        <thead>
          <tr>
            <th>
              <b>Name</b>
            </th>
            <th>
              <b>Age</b>
            </th>
            <th>
              <b>Gender</b>
            </th>
            <th>
              <b>Grade</b>
            </th>
            <th>
              <b>Marks</b>
            </th>
            <th>
              <b>Attendance</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortByHandler.map(
            ({ name, age, marks, attendance, grade, gender }) => (
              <tr>
                <td>{name}</td>
                <td>{age}</td>
                <td>{gender ? gender : "-"}</td>
                <td>{grade}</td>
                <td>{marks ? marks : "-"}</td>
                <td>{attendance ? attendance : "-"}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClassView;
