import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuth }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
  };

  return (
    <header>
      {/* Logo được bọc bởi Link */}
      <Link to="/" className="logo">
        HouRenShuu
      </Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="コースを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>検索</button>
      </div>

      <div className="link">
        {/* <Link to={"/"}>Home</Link> */}
        <Link to={"/courses"}>コース</Link>
        <Link to={"/about"}>について</Link>
        {isAuth ? (
          <Link to={"/account"}>アカウント</Link>
        ) : (
          <Link to={"/login"}>ログイン</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
