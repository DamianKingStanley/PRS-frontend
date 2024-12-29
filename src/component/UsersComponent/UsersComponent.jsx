import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersComponent.css";

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://prs-server-by31.onrender.com/user/fetch-users",
        {
          params: { search },
        }
      );
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="users-container">
      <h3>Manage Users</h3>

      <input
        type="text"
        placeholder="Find a customer"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="users-wrapper">
          {users.length > 0 ? (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.userId} className="user-card">
                  <div className="user-info">
                    <strong>Fullname:</strong> {user.fullname}
                  </div>
                  <div className="user-info">
                    <strong>Username:</strong> {user.username}
                  </div>
                  <div className="user-info">
                    <strong>Email:</strong> {user.email}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersComponent;
