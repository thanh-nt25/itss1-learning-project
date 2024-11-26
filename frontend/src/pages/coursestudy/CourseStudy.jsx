import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import courseImageJapanese from "./assets/japan-course.png";
import courseImageCulture from "./assets/Culture.jpg";
import courseImageVietnamese from "./assets/vietnamese.jpg";


// const CourseCard = ({ course }) => {
  
const CourseStudy = ({ user }) => {
  const references = [
    {
      title: "Introduction to Japanese Language",
      description: "An overview of the Japanese language for beginners.",
      link: "https://www.example.com/japanese-introduction",
    },
    {
      title: "Japanese Cultural Practices",
      description: "Deep dive into traditional Japanese culture.",
      link: "https://www.example.com/japanese-culture",
    },
    {
      title: "Advanced Vietnamese Grammar",
      description: "Understand advanced grammar rules in Vietnamese.",
      link: "https://www.example.com/vietnamese-grammar",
    },
  ];

  const categoryImages = {
    "Japanese": courseImageJapanese,
    "Culture": courseImageCulture,
    "Vietnamese": courseImageVietnamese,
    "Default": courseImageJapanese, 
  };

  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div className="course-study-page">
          {/* Section 1: Title */}
          <div className="course-title-section">
            <h1>{course.title}</h1>
            <p>Duration: {course.duration} weeks</p>
            <Link to={`/lectures/${course._id}`} className="continue-btn">
              <h2>Continue Learning</h2>
            </Link>
          </div>

          {/* Section 3: Tabs */}
          <div className="course-tabs">
            <button>Content</button>
            <button>Exercises</button>
          </div>

          {/* Section 2: Statistics */}
          <div className="course-statistics">
            <img src={categoryImages[course.category] || categoryImages["Default"]} alt="Course Thumbnail" />
            <div className="course-stats">
              <p>Total Lectures: {course.lecturesCount || 0}</p>
              <p>Completed: {course.completedLectures || 0}</p>
              <p>Progress: {course.progress || 0}%</p>
              {/* <Link to={`/lectures/${course._id}`}>
                <h2>Continue</h2>
              </Link> */}
            </div>
          </div>

          

          {/* Section 4: Content */}
          <div className="course-content">
            {course.sections?.map((section, index) => (
              <div key={index} className="course-section">
                <h3>{section.title}</h3>
                <ul>
                  {section.lectures?.map((lecture, idx) => (
                    <li key={idx}>
                      <input type="checkbox" checked={lecture.completed} readOnly />
                      {lecture.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section 5: References */}
            <div className="course-references">
              <h2>References</h2>
              <ul>
                {references.map((ref, index) => (
                  <li key={index} className="reference-item">
                    <h3>{ref.title}</h3>
                    <p>{ref.description}</p>
                    <a href={ref.link} target="_blank" rel="noopener noreferrer">
                      View Resource
                    </a>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;


// import React, { useEffect } from "react";
// import "./coursestudy.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import { server } from "../../main";

// const CourseStudy = ({ user }) => {
//   const params = useParams();

//   const { fetchCourse, course } = CourseData();
//   const navigate = useNavigate();

//   if (user && user.role !== "admin" && !user.subscription.includes(params.id))
//     return navigate("/");

//   useEffect(() => {
//     fetchCourse(params.id);
//   }, []);
//   return (
//     <>
//       {course && (
//         <div className="course-study-page">
//           <img src={`${server}/${course.image}`} alt="" width={350} />
//           <h2>{course.title}</h2>
//           <h4>{course.description}</h4>
//           <h5>by - {course.createdBy}</h5>
//           <h5>Duration - {course.duration} weeks</h5>
//           <Link to={`/lectures/${course._id}`}>
//             <h2>Lectures</h2>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default CourseStudy;
