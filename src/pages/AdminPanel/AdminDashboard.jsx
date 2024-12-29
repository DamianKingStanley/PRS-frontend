import React, { useState } from "react";
import AdminPanel from "./AdminPanel";
import UsersComponent from "../../component/UsersComponent/UsersComponent";
import CreatePost from "../CreatePost/CreatePost";
import "./AdminDashboard.css";
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa";
import Navbar from "../../component/Navbar/Navbar";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("create-posts");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case "search-book":
        return <AdminPanel />;
      case "users":
        return <UsersComponent />;
      case "create-posts":
        return <CreatePost />;
      case "all-orders":
        return <CreatePost />;
      default:
        return <AdminPanel />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Navbar />
      <div
        className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        <button className="sidebar-toggles" onClick={toggleSidebar}>
          {sidebarOpen ? <FaDoorOpen /> : <FaDoorClosed />}
        </button>

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <h2>Admin Dashboard</h2>
          <ul>
            <li onClick={() => setActiveComponent("search-book")}>
              Find Books
            </li>
            <li onClick={() => setActiveComponent("users")}>Manage Users</li>
            <li onClick={() => setActiveComponent("create-posts")}>
              Add Books
            </li>
            <li onClick={() => setActiveComponent("all-orders")}>Orders</li>
          </ul>
        </div>

        <div className="main-content">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
