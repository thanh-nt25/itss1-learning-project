import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./addcourse.css";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    category: "",
    content: "",
    level: "",
    status: "Active",
    materials: "",
    practice: "",
  });

  const [activeTab, setActiveTab] = useState("materials");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you'd send a POST request to the backend here
    toast.success(`Course "${courseData.name}" added successfully!`);
    navigate("/admin/courses"); // Navigate back to courses list
  };

  // Handle cancel action
  const handleCancel = () => {
    setCourseData({
      name: "",
      category: "",
      content: "",
      level: "",
      status: "Active",
      materials: "",
      practice: "",
    });
    navigate("/admin/courses");
  };

  return (
    <div className="add-course">
      <h1>コースを追加</h1>
      <form onSubmit={handleSubmit} className="course-form">
        {/* Course Name */}
        <div className="form-group">
          <label htmlFor="name">コース名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            placeholder="Enter course name"
            required
          />
        </div>

        {/* Two-column layout for Category, Course Content, Level, and Status */}
        <div className="form-row">
          <div className="column">
            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">カテゴリ</label>
              <select
                id="category"
                name="category"
                value={courseData.category}
                onChange={handleChange}
                required
              >
                <option value="">カテゴリーを選択</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
                <option value="Programming">Programming</option>
                <option value="Machine Learning">Machine Learning</option>
              </select>
            </div>

            {/* Course Content */}
            <div className="form-group">
              <label htmlFor="content">Course Content</label>
              <textarea
                id="content"
                name="content"
                value={courseData.content}
                onChange={handleChange}
                placeholder="Enter course content"
                required
              />
            </div>
          </div>

          <div className="column">
            {/* Level */}
            <div className="form-group">
              <label htmlFor="level">レベル</label>
              <select
                id="level"
                name="level"
                value={courseData.level}
                onChange={handleChange}
                required
              >
                <option value="">レベルを選択</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status">状態</label>
              <select
                id="status"
                name="status"
                value={courseData.status}
                onChange={handleChange}
                required
              >
                <option value="Active">アクティブ</option>
                <option value="Inactive">非アクティブ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            type="button"
            className={`tab ${activeTab === "materials" ? "active" : ""}`}
            onClick={() => handleTabChange("materials")}
          >
            材料
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "practice" ? "active" : ""}`}
            onClick={() => handleTabChange("practice")}
          >
            練習する
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "materials" && (
          <div className="tab-content">
            <div className="form-group">
              <label htmlFor="materials">Materials</label>
              <textarea
                id="materials"
                name="materials"
                value={courseData.materials}
                onChange={handleChange}
                placeholder="Enter materials (e.g., sections, documents, videos)"
              />
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="tab-content">
            <div className="form-group">
              <label htmlFor="practice">Practice</label>
              <textarea
                id="practice"
                name="practice"
                value={courseData.practice}
                onChange={handleChange}
                placeholder="Enter practice scenarios"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
          コースを保存
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
