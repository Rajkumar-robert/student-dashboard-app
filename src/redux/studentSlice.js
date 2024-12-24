import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  fetchByCohortAndCourse,
} from '../services/dbFunctions';

// Async thunks for CRUD operations
export const loadStudents = createAsyncThunk('students/load', async (_, { rejectWithValue }) => {
  try {
    return await fetchAllStudents();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addStudent = createAsyncThunk('students/add', async (student, { rejectWithValue }) => {
  try {
    return await createStudent(student);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const modifyStudent = createAsyncThunk(
  'students/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      console.log('thunk Updating student: ', id, updatedData); 
      const {status} = await updateStudent(id, updatedData);
      console.log('status: ', status);
      if(status === 204) {
        return updatedData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeStudent = createAsyncThunk('students/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteStudent(id);
    return id; // Returning the deleted student's ID
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchStudentsByCohortAndCourse = createAsyncThunk(
  'students/fetchByCohortAndCourse',
  async ({ cohort, course }, { rejectWithValue }) => {
    try {
      return await fetchByCohortAndCourse(cohort, course);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  data: [],
  loading: false,
  fetching: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
};

// Slice
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load students
      .addCase(loadStudents.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(loadStudents.fulfilled, (state, action) => {
        state.fetching = false;
        state.data = action.payload;
      })
      .addCase(loadStudents.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })

      // Fetch by cohort and course
      .addCase(fetchStudentsByCohortAndCourse.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchStudentsByCohortAndCourse.fulfilled, (state, action) => {
        state.fetching = false;
        state.data = action.payload;
      })
      .addCase(fetchStudentsByCohortAndCourse.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })

      // Add student
      .addCase(addStudent.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.creating = false;
        state.data.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      // Update student
      .addCase(modifyStudent.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(modifyStudent.fulfilled, (state, action) => {
        state.updating = false;
        console.log('fulfilled Updating student: ', action); // Debugging purpose
        const index = state.data.findIndex((student) => student.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(modifyStudent.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // Remove student
      .addCase(removeStudent.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.deleting = false;
        state.data = state.data.filter((student) => student.id !== action.payload);
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
