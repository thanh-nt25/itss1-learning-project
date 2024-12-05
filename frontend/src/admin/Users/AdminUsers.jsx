import React, { useState } from "react";
import "./users.css";

const AdminUsers = () => {
  // Mock data for users (this would normally come from an API)
  const users = [
    { id: 1, avatar: "https://randomuser.me/api/portraits/men/1.jpg", name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: 2, avatar: "https://randomuser.me/api/portraits/women/2.jpg", name: "Jane Smith", email: "jane@example.com", role: "User", status: "inactive" },
    { id: 3, avatar: "https://randomuser.me/api/portraits/men/3.jpg", name: "Samuel Lee", email: "samuel@example.com", role: "User", status: "active" },
    { id: 4, avatar: "https://randomuser.me/api/portraits/women/4.jpg", name: "Anna Brown", email: "anna@example.com", role: "Admin", status: "inactive" },
    { id: 5, avatar: "https://randomuser.me/api/portraits/men/5.jpg", name: "Mike Johnson", email: "mike@example.com", role: "User", status: "active" },
    { id: 6, avatar: "https://randomuser.me/api/portraits/women/6.jpg", name: "Lily White", email: "lily@example.com", role: "User", status: "active" },
    // Add more mock users as needed
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Total pages calculation
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="admin-users">
      <h1>ユーザー管理</h1>

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

        <button className="add-user-btn" onClick={() => alert("Add user clicked!")}>ユーザーを追加</button>
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>アバター</th>
            <th>名前</th>
            <th>メール</th>
            <th>役割</th>
            <th>状態</th>
            <th>ビュー</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="avatar">
                <img src={user.avatar} alt={user.name} />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className={`status ${user.status}`}>
                {user.status === "active" ? "Active" : "Inactive"}
              </td>
              <td className="view">
                <button>View</button>
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

export default AdminUsers;
