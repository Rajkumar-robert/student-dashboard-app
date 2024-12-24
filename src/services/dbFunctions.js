import { supabase } from './supabase';

// Create new student
export const createStudent = async (studentData) => {
  console.log("Creating student: ", studentData); // Debugging purpose
  const { data, error } = await supabase.from('StudentTable').insert([studentData]);
  if (error) throw error;
  return data;
};

// Fetch all students
export const fetchAllStudents = async () => {
  const { data, error } = await supabase.from('StudentTable').select('*');
  if (error) throw error;
  return data;
};

// Fetch by cohort and course
export const fetchByCohortAndCourse = async (cohort, course) => {
  console.log("Fetching by cohort and course: ", cohort, course); // Debugging purpose
  const { data, error } = await supabase
    .from("StudentTable")
    .select("*")

  if (error) throw error;

  let filteredData = data;
  if(cohort) {
    console.log("Filtering by cohort: ", cohort); // Debugging purpose
    filteredData = data.filter((student) => student.cohort === cohort);
  }
  // Filter for course substring match
  if (course) {
    console.log("Filtering by course: ", course); // Debugging purpose
    filteredData = data.filter((student) =>
      student.courses.some((courseName) => courseName.includes(course))
    );
  }

  console.log(filteredData); // Debugging purpose
  return filteredData;
};


export const updateStudent = async (id, updatedData) => {
  console.log("Updating student: ", id, updatedData); // Debugging purpose
  const content = await supabase.from('StudentTable').update(updatedData).eq('id', id);
   if (content.error) throw content.error;
  return content;
};

// Delete student
export const deleteStudent = async (id) => {
  const { data, error } = await supabase.from('StudentTable').delete().eq('id', id);
  if (error) throw error;
  return data;
};
