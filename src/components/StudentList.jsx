import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchStudentsByCohortAndCourse, loadStudents } from "../redux/studentSlice";
import { MdArrowDownward, MdPlusOne } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa";

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: students = [], loading } = useSelector((state) => state.students);
  const [cohort, setCohort] = useState("");
  const [course, setCourse] = useState("");
  const monthAbbreviations = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    dispatch(loadStudents());
  }, [dispatch]);

  useEffect(() => {
    if (cohort || course) {
      dispatch(fetchStudentsByCohortAndCourse({ cohort, course }));
    } else {
      dispatch(loadStudents());
    }
  }, [dispatch, cohort, course]);

  const handleRowClick = (studentId) => {
    navigate(`/edit/${studentId}`);
  };

  const handleCohortChange = (e) => {
    setCohort(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const formatJoinDate = (joinDate) => {
    const date = new Date(joinDate);

    const day = date.getDate(); // Get day
    const month = monthAbbreviations[date.getMonth()]; // Get month abbreviation
    const year = date.getFullYear(); // Get year

    return `${day}.${month}.${year}`;
  };

  const formatLastLogin = (lastLogin) => {
    const formatedDate = formatJoinDate(lastLogin.split("T")[0]);
    const date = new Date(lastLogin);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formatedDate} ${hours}:${formattedMinutes} ${period}`;
  }

  return (
    <div className="p-6 min-h-screen bg-white rounded-lg ">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4 mb-4 justify-center items-center">
        <div className="flex justify-between items-center space-x-3 bg-[#E9EDF1] font-bold px-4 py-2 rounded-lg ">
            <select
              name="cohort"
              value={cohort}
              onChange={handleCohortChange}
              className="appearance-none bg-[#E9EDF1] text-[#425470]"
            >
              <option value="">All Cohorts</option>
              <option value="AY 2024-25">AY 2024-25</option>
              <option value="AY 2023-24">AY 2023-24</option>
              <option value="AY 2022-23">AY 2022-23</option>
            </select>
            <div className="flex items-center pointer-events-none">
              <FaAngleDown className="text-[#425470] font-semibold mt-1 text-xl" />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-3 bg-[#E9EDF1] font-bold px-4 py-2 rounded-lg ">
            <select
              name="course"
              value={course}
              onChange={handleCourseChange}
              className="appearance-none bg-[#E9EDF1] text-[#425470]">
              <option value="">All Courses</option>
              <option value="CBSE 9">CBSE 9</option>
              <option value="CBSE 10">CBSE 10</option>
              <option value="CBSE 11">CBSE 11</option>
            </select>
            <div className="flex items-center pointer-events-none">
              <FaAngleDown className="text-[#425470] font-semibold mt-1 text-xl" />
            </div>
          </div>

        </div>
        <Link
          to="/add-student"
          className="w-fit bg-[#E9EDF1] text-[#425470] font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2">
          <LuPlus size={20} />
          <span>Add New Student</span>
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="">
          <table className="table-auto w-full bg-white">
            <thead>
              <tr className=" text-gray-700">
                <th className="px-4 py-2 text-left">Student Name</th>
                <th className="px-4 py-2 text-left">Cohort</th>
                <th className="px-4 py-2 text-left">Courses</th>
                <th className="px-4 py-2 text-left">Date Joined</th>
                <th className="px-4 py-2 text-left">Last Login</th>
                <th className="px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-none hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(student.id)}
                >
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.cohort}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      {student.courses ? (
                        student.courses.map((course, index) => (
                          <span
                            key={index}
                            className="flex items-center bg-gray-100 text-sm text-gray-600 px-2 py-1 rounded-md"
                          >
                            {course}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">No courses</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">{formatJoinDate(student.dateJoined)}</td>
                  <td className="px-4 py-2">{formatLastLogin(student.lastLogin)}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${student.status ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
