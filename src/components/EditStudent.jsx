import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteStudent, updateStudent } from "../services/dbFunctions";

const EditStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const { data: students = [] } = useSelector((state) => state.students); // Access students from Redux
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    cohort: "",
    courses: "",
    dateJoined: "",
    status: true,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Find the student by ID
    const student = students.find((s) => s.id === id);
    if (student) {
      setFormData({
        id: student.id,
        name: student.name,
        cohort: student.cohort,
        courses: student.courses.join(","), // Convert array to comma-separated string
        dateJoined: new Date(student.dateJoined).toISOString().split("T")[0], // Format date
        status: student.status,
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
      const formattedData = {
        ...formData,
        courses: formData.courses,
        dateJoined: new Date(formData.dateJoined).toISOString(), // Format date to ISO
      };
      await updateStudent(formData.id, formattedData);
      setMessage("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      setMessage("Failed to update student. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(formData.id);
      setMessage("Student deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting student:", error);
      setMessage("Failed to delete student. Please try again.");
    }
  };

  // if (!formData.id) {

  //   return <p className="text-center text-gray-600">Loading student data...</p>;
  // }


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
          <input
            type="text"
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Courses</label>
          <input
            type="text"
            name="courses"
            value={formData.courses}
            onChange={handleChange}
            placeholder="Enter courses separated by commas"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Date Joined
          </label>
          <input
            type="date"
            name="dateJoined"
            value={formData.dateJoined}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update Student
        </button>
        <button   className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 mt-4"
        onClick={handleDelete}>Delete</button>
      </form>

      {message && (
        <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default EditStudent;
