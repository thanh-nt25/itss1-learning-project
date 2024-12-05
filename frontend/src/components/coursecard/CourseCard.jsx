import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import courseImageJapanese from "./japan-course.png";
import courseImageCulture from "./Culture.jpg";
import courseImageVietnamese from "./vietnamese.jpg";
import { useLocation } from "react-router-dom";

const CourseCard = ({ course }) => {
  const categoryImages = {
    "Japanese": courseImageJapanese,
    "Culture": courseImageCulture,
    "Vietnamese": courseImageVietnamese,
    "Default": courseImageJapanese, 
  };

  // Checking if we are in the Admin route
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const navigate = useNavigate();

  // Simulating user's progress for each course (static data)
  const completedLessons = course.completedLessons || 0;  // Static number of completed lessons
  const totalLessons = course.totalLessons || 0;  // Total lessons in the course
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;  // Calculate progress

  // Simulate whether the user has subscribed or studied the course
  const isSubscribed = true;  // Simulate subscription status (for demo purposes)

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`);
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Status - Studied or Not Studied
  const isStudied = isSubscribed ? "Studied" : "Not Studied"; 

  return (
    <div className="course-card">
      <img
        src={categoryImages[course.category] || categoryImages["Default"]}
        alt={course.category}
        className="course-image"
      />
      <h3>{course.title}</h3>
      <p>講師: {course.createdBy}</p>
      <p>間隔: {course.duration} 週間</p>
      <p>価格: {course.price}</p>

      {/* Tab: Studied or Not Studied */}
      <div className={`status-tab ${isStudied === "勉強した" ? "勉強した" : "勉強していない"}`}>
        {isStudied}
      </div>

      {/* Static Progress Bar */}
      {isSubscribed && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{Math.round(progress)}% 完了</span>
        </div>
      )}

      <button
        onClick={() => navigate(`/course/study/${course._id}`)}
        className="common-btn"
      >
        始める
      </button>

      <br />

      {isAdminRoute && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          消去
        </button>
      )}
    </div>
  );
};

export default CourseCard;
