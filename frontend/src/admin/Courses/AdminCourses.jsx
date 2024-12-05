import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./admincourses.css";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  // Mock data for courses (this would normally come from an API)
  const courses = [
    { id: 1, name: "React for Beginners", level: "Beginner", participants: 120, status: "Active", category: "Web Development" },
    { id: 2, name: "Advanced JavaScript", level: "Advanced", participants: 85, status: "Inactive", category: "Programming" },
    { id: 3, name: "Python Fundamentals", level: "Beginner", participants: 200, status: "Active", category: "Data Science" },
    { id: 4, name: "Full Stack Development", level: "Intermediate", participants: 150, status: "Inactive", category: "Web Development" },
    { id: 5, name: "Machine Learning 101", level: "Advanced", participants: 180, status: "Active", category: "Data Science" },
    { id: 6, name: "UI/UX Design Basics", level: "Beginner", participants: 100, status: "Active", category: "Design" },
    // Add more mock courses as needed
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current courses for the page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Total pages calculation
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Handle delete course
  const handleDeleteCourse = (courseId) => {
    toast.error(`Course with ID: ${courseId} deleted!`);
    // Add deletion logic here (this is just a mock)
  };

  return (
    <div className="admin-courses">
      <h1>コース管理</h1>

      {/* Filter Section */}
      <div className="filter-section">
        {/* Left side: Pagination info */}
        <div className="filter-left">
          {/* <p>{`Showing ${currentPage * usersPerPage - usersPerPage + 1} - ${Math.min(currentPage * usersPerPage, users.length)} of ${users.length} users`}</p> */}
          <select>
            <option value="5">1ページあたり5件</option>
            <option value="10">1ページあたり10件</option>
            <option value="15">1ページあたり15件</option>
          </select>
        </div>

        {/* Right side: Search and Filter */}
        <div className="filter-right">
          <input type="text" placeholder="ユーザーを検索..." />
          <select>
            <option value="">役割を選択</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <button className="add-user-btn" onClick={() => navigate('/admin/addcourse')}>コースを追加</button>
      </div>

      {/* Course Table */}
      <table className="course-table">
        <thead>
          <tr>
            <th>名前</th>
            <th>レベル</th>
            <th>参加者</th>
            <th>状態</th>
            <th>カテゴリ</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.level}</td>
              <td>{course.participants}</td>
              <td className={`status ${course.status}`}>
                {course.status === "Active" ? "Active" : "Inactive"}
              </td>
              <td>{course.category}</td>
              <td className="actions">
                <button className="edit"　onClick={() => toast.success(`Editing course: ${course.name}`)}>View</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          前へ
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          次
        </button>
      </div>
    </div>
  );
};

export default AdminCourses;
