import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import { Line } from "react-chartjs-2";  // Sử dụng Line chart từ react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register các component của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Kiểm tra quyền người dùng
  if (user && user.role !== "admin") return navigate("/");

  // Mock data cho các stats (vì không kết nối với backend)
  const [stats] = useState({
    totalCourses: 150,
    totalLectures: 1230,
    totalUsers: 5000,
  });

  // Dữ liệu cho các biểu đồ (giả lập)
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Courses",
        data: [30, 40, 50, 60, 70, 80, 90], // Dữ liệu mock cho biểu đồ Courses
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Total Lectures",
        data: [150, 170, 190, 210, 230, 250, 270], // Dữ liệu mock cho biểu đồ Lectures
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
      {
        label: "Total Users",
        data: [1000, 2000, 3000, 3500, 4000, 4500, 5000], // Dữ liệu mock cho biểu đồ Users
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <Layout>
        <div className="dashboard-container">
          {/* Header */}
          <header className="dashboard-header">
            <div className="header-left">
              <h1>Admin Dashboard</h1>
            </div>
            <div className="header-right">
              <div className="user-info">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="user-avatar"
                />
                <span className="username">{user ? user.name : "Admin"}</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="main-content">
            {/* Grid container for cards */}
            <div className="card-grid">
              {/* Card 1: Biểu đồ Total Courses */}
              <div className="stat-card">
                <h2>Total Courses</h2>
                <Line data={chartData} options={{ responsive: true }} />
              </div>

              {/* Card 2: Biểu đồ Total Lectures */}
              <div className="stat-card">
                <h2>Total Lectures</h2>
                <Line data={chartData} options={{ responsive: true }} />
              </div>

              {/* Card 3: Biểu đồ Total Users */}
              <div className="stat-card">
                <h2>Total Users</h2>
                <Line data={chartData} options={{ responsive: true }} />
              </div>

              {/* Card 4: Biểu đồ với dữ liệu giả lập khác */}
              <div className="stat-card">
                <h2>Custom Metric</h2>
                <Line data={chartData} options={{ responsive: true }} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="footer">
            <p>&copy; 2024 Admin Dashboard. All Rights Reserved.</p>
          </footer>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
