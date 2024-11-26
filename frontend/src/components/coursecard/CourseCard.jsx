import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";
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

  // add
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  //add
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`);

        // const { data } = await axios.delete(`${server}/api/course/${id}`, {
        //   headers: {
        //     token: localStorage.getItem("token"),
        //   },
        // });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="course-card">
      {/* <img src={`${server}/${course.image}`} alt="" className="course-image" /> */}
      <img
        src={categoryImages[course.category] || categoryImages["Default"]}
        alt={course.category}
        className="course-image"
      />
      <h3>{course.title}</h3>
      <p>Instructor: {course.createdBy}</p>
      <p>Duration: {course.duration} weeks</p>
      <p>Price: {course.price}</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}

      <br />

      {/* {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )} */}
      {isAdminRoute && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
