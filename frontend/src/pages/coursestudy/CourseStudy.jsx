import React, { useEffect, useState } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import courseImageJapanese from "./assets/japan-course.png";
import courseImageCulture from "./assets/Culture.jpg";
import courseImageVietnamese from "./assets/vietnamese.jpg";
import axios from "axios";

const CourseStudy = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  // Simulating lecture completion (you would replace this with actual logic)
  const handleLectureCompletion = (lectureId) => {
    setCompletedLectures((prev) => [...prev, lectureId]); // Add to completed lectures
    // Update progress or send to backend if necessary
  };

  // Fetch course lectures
  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`);
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Fetch user's progress on this course
  async function fetchProgress() {
    try {
      const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`);
      setCompletedLectures(data.completedLectures);
      setProgress(data.progress); // assuming data.progress is a percentage
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourse(params.id);
    fetchLectures();
    fetchProgress();
  }, [params.id]);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) return navigate("/");

  const categoryImages = {
    "Japanese": courseImageJapanese,
    "Culture": courseImageCulture,
    "Vietnamese": courseImageVietnamese,
    "Default": courseImageJapanese,
  };

  return (
    <>
      {course && (
        <div className="course-study-page">
          {/* Section 1: Title */}
          <div className="course-title-section">
            <h1>{course.title}</h1>
            <p>間隔: {course.duration} 週間</p>
            <Link to={`/lectures/${course._id}`} className="continue-btn">
              <h2>学習を続ける</h2>
            </Link>
          </div>

          {/* Section 2: Course Stats */}
          <div className="course-stats-container">
            <div className="course-statistics">
              <img
                src={categoryImages[course.category] || categoryImages["Default"]}
                alt="Course Thumbnail"
              />
              <div className="course-stats">
                <p>総講義数: {lectures.length}</p>
                <p>完了: {completedLectures.length}</p>
                <p>進捗: {progress}%</p>
              </div>
            </div>

          {/* Section 3: Lectures List */}
          <div className="course-lectures">
            <h2>講義</h2>
            {loading ? (
              <p>講義を読み込んでいます...</p>
            ) : (
              <ul>
                {lectures.map((lecture) => (
                  <li key={lecture._id}>
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(lecture._id)}
                      onChange={() => handleLectureCompletion(lecture._id)}
                    />
                    <Link to={`/lectures/${course._id}`}>{lecture.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          </div>

          {/* Section 4: References */}
          <div className="course-references">
            <h2>参考文献</h2>
            <ul>
              <li className="reference-item">
                <h3>日本語入門</h3>
                <p>初心者のための日本語の概要.</p>
                <a href="https://www.example.com/japanese-introduction" target="_blank" rel="noopener noreferrer">
                リソースを表示
                </a>
              </li>
              <li className="reference-item">
                <h3>日本の文化的慣習</h3>
                <p>日本の伝統文化を深く知る.</p>
                <a href="https://www.example.com/japanese-culture" target="_blank" rel="noopener noreferrer">
                リソースを表示
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
