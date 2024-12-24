import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadStudents, modifyStudent, removeStudent } from "../redux/studentSlice";

const EditStudent = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("studentId"); 
  const dispatch = useDispatch();
  const { data: students = [] } = useSelector((state) => state.students);
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    cohort: "",
    courses: [],
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const courseList = [
    "CBSE 9 Math",
    "CBSE 9 Science",
    "CBSE 9 English",
    "CBSE 10 Math",
    "CBSE 10 Science",
    "CBSE 10 English",
    "CBSE 11 Math",
    "CBSE 11 Science",
    "CBSE 11 English",
  ];

  useEffect(() => {
    const student = students.find((s) => s.id === parseInt(id));
    if (student) {
      setFormData({
        id:student.id,
        name: student.name,
        cohort: student.cohort,
        courses: student.courses,
      });
    }
  }, [id, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        courses: formData.courses,
      };
      console.log("Updated data: ", updatedData);
      await dispatch(modifyStudent({ id,updatedData })).unwrap(); // Dispatch Redux thunk
      setMessage("Student updated successfully!");
      dispatch(loadStudents());
      // navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
      setMessage("Failed to update student. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeStudent(id)).unwrap(); // Dispatch Redux thunk
      setMessage("Student deleted successfully!");
      setFormData({
        name: "",
        cohort: "",
        courses: [],
      });
      // navigate("/");
    } catch (error) {
      console.error("Error deleting student:", error);
      setMessage("Failed to delete student. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Student</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg max-w-md mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Cohort</label>
          <select
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>
              Select Cohort
            </option>
            <option value="AY 2024-25">AY 2024-25</option>
            <option value="AY 2023-24">AY 2023-24</option>
            <option value="AY 2022-23">AY 2022-23</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Courses
          </label>
          <div className="flex flex-col space-y-2">
            {courseList.map((course) => (
              <label key={course} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="courses"
                  value={course}
                  checked={formData.courses.includes(course)}
                  onChange={(e) => {
                    const selectedCourse = e.target.value;
                    setFormData((prev) => {
                      const courses = prev.courses.includes(selectedCourse)
                        ? prev.courses.filter((c) => c !== selectedCourse)
                        : [...prev.courses, selectedCourse];
                      return { ...prev, courses };
                    });
                  }}
                  className="focus:ring focus:ring-blue-200"
                />
                <span className="text-gray-700">{course}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update Student
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 mt-4"
        >
          Delete
        </button>
      </form>
      {message && (
        <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default EditStudent;
