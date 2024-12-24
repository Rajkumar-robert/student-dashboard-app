import React, { useState } from "react";
import { createStudent } from "../services/dbFunctions";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    cohort: "",
    courses: "",
    dateJoined: "",
    status: true,
  });

  const [message, setMessage] = useState("");

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
      // Format dateJoined and lastLogin without fractional seconds
      const formattedData = {
        ...formData,
        courses: formData.courses.split(",").map((course) => course.trim()), // Convert courses string to array
        dateJoined: new Date().toISOString().split(".")[0],
        lastLogin: new Date().toISOString().split(".")[0], // Remove fractional seconds
      };
      await createStudent(formattedData);
      setMessage("Student added successfully!");
      setFormData({
        id: "",
        name: "",
        cohort: "",
        courses: "",
        dateJoined: "",
        status: true,
      });
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Student</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg max-w-md mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

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
            <option value="" disabled>Select Cohort</option>
            <option value="AY 2024-25">AY 2024-25</option>
            <option value="AY 2023-24">AY 2023-24</option>
            <option value="AY 2022-23">AY 2022-23</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Courses</label>
          <div className="flex flex-col space-y-2">
            {[
              "CBSE 9 Math",
              "CBSE 9 Science",
              "CBSE 9 English",
              "CBSE 10 Math",
              "CBSE 10 Science",
              "CBSE 10 English",
              "CBSE 11 Math",
              "CBSE 11 Science",
              "CBSE 11 English",
            ].map((course) => (
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
                        ? prev.courses.filter((c) => c !== selectedCourse) // Remove if already selected
                        : [...prev.courses, selectedCourse]; // Add if not already selected
                      return {
                        ...prev,
                        courses,
                      };
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
          Add Student
        </button>
      </form>

      {message && (
        <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default AddStudent;
