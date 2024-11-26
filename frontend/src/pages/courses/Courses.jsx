import React, { useState, useEffect } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [selectedCategories, setSelectedCategories] = useState([]); 

  useEffect(() => {
    setFilteredCourses(courses || []);
  }, [courses]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((category) => category !== value));
    }
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredCourses(courses); 
    } else {
      setFilteredCourses(
        courses.filter((course) => selectedCategories.includes(course.category))
      );
    }
  }, [selectedCategories, courses]);

  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <div className="courses-layout">
        {/* Bộ lọc bên trái */}
        <div className="filter-container">
          <h3>Categories</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Japanese"
                onChange={handleCategoryChange}
              />
              Japanese
            </label>
            <label>
              <input
                type="checkbox"
                value="Culture"
                onChange={handleCategoryChange}
              />
              Culture
            </label>
            <label>
              <input
                type="checkbox"
                value="Vietnamese"
                onChange={handleCategoryChange}
              />
              Vietnamese
            </label>

            <h3>Level</h3>
            <label>
              <input
                type="checkbox"
                value="N3"
                onChange={handleCategoryChange}
              />
              N3
            </label>
            <label>
              <input
                type="checkbox"
                value="N2"
                onChange={handleCategoryChange}
              />
              N2
            </label>
            <label>
              <input
                type="checkbox"
                value="N1"
                onChange={handleCategoryChange}
              />
              N1
            </label>
              
            
          </div>
        </div>
        
        {/* Danh sách khóa học */}
        <div className="course-container">
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p>No Courses Yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
