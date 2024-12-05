import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./home.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Home = () => {
  const navigate = useNavigate();
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
    <div>
      <div className="home">
        {/* Thay thế home-content bằng slider */}
        <Slider {...sliderSettings}>
          <div className="slide-item">
            <div className="slide-content">
              <h2>日本語と文化の総合コース</h2>
              <p>
                このコースでは、言語と文化の両面から日本を深く理解することができます。日本語の基礎から応用までを学びながら、実際の会話に役立つ表現や文法、そして日本の独特な文化を理解することができます。初心者から中級者、さらには上級者まで、すべてのレベルに対応したカリキュラムを提供しています。
              </p>
              <p>
                日本語と文化を学ぶことで、あなたの人生に新しい視点と機会をもたらすことができるでしょう。さあ、一緒に日本語と日本文化の魅力を発見し、学んでみましょう！
              </p>
              <button onClick={() => navigate('/courses')}>詳細はこちら</button>
            </div>
          </div>
          <div className="slide-item">
            <div className="slide-content">
              <h2>日本の伝統と文化を学ぼう</h2>
              <p>
                日本は豊かな歴史と文化を持つ国です。このコースでは、日本の伝統行事や祭り、食文化、さらに現代日本のポップカルチャーまで幅広く学びます。日本人の考え方や生活様式を理解し、文化交流を深めることができます。
              </p>
              <p>
                日本の文化に触れることで、あなたの視野が広がり、異なる文化を尊重することができるようになります。
              </p>
              <button onClick={() => navigate('/courses')}>詳細はこちら</button>
            </div>
          </div>
          <div className="slide-item">
            <div className="slide-content">
              <h2>日本語を使って世界と繋がる</h2>
              <p>
                日本語は世界中で広く学ばれている言語の一つです。このコースでは、日本語を使った実践的な会話やビジネス日本語、旅行日本語など、様々なシチュエーションで使える日本語を学びます。日本語をマスターすることで、世界中の日本語話者と交流することができます。
              </p>
              <p>
                日本語を学び、あなたの未来を広げましょう！
              </p>
              <button onClick={() => navigate('/courses')}>詳細はこちら</button>
            </div>
          </div>
        </Slider>
      </div>

      {/* Hiển thị các khóa học */}
      <h2 className="course-title">注目のコース</h2>
      <div className="course-container">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
