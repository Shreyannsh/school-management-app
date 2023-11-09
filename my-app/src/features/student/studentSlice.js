import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://reduxtoolkit-example-student-management.tanaypratap.repl.co/students "
    );
    console.log(response);
    return response.data;
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(
      "https://reduxtoolkit-example-student-management.tanaypratap.repl.co/students",
      newStudent
    );

    return response.data;
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, studentInfo }) => {
    const response = await axios.put(
      `https://reduxtoolkit-example-student-management.tanaypratap.repl.co/students/${id}`,
      studentInfo
    );

    return response.data;
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    const response = await axios.delete(
      `https://reduxtoolkit-example-student-management.tanaypratap.repl.co/students/${id}`
    );

    return response.data;
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: null,
  filter: "all",
  sortBy: "name",
};

export const studentSlice = createSlice({
  name: "students",

  initialState,

  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "pending";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    },

    [addStudentAsync.pending]: (state) => {
      state.status = "pending";
    },
    [addStudentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.students = action.payload;
    },
    [addStudentAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [updateStudentAsync.pending]: (state) => {
      state.status = "pending";
    },
    [updateStudentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const updatedStudent = action.payload;
      const studentIndex = state.students.findIndex(
        (student) => student.id === updatedStudent.id
      );
      if (studentIndex !== -1) {
        state.students[studentIndex] = updatedStudent;
      }
    },
    [updateStudentAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
  [deleteStudentAsync.pending]: (state) => {
    state.status = "pending";
  },
  [deleteStudentAsync.fulfilled]: (state, action) => {
    state.status = "fulfilled";
    state.students = state.students.filter(
      ({ _id }) => _id !== action.payload._id
    );
  },
  [deleteStudentAsync.rejected]: (state) => {
    state.status = "rejected";
  },
});

export const { setFilter, setSortBy } = studentSlice.actions;

export default studentSlice.reducer;
