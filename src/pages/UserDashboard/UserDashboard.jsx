import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";
import { useParams } from "react-router-dom";
import PostsDisplay from "./PostsDisplay";
import Navbar from "../../component/Navbar/Navbar";
import LoaderSpanner from "../../component/LoaderSpinner/LoaderSpinner";

const UserDashboard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://prs-server-by31.onrender.com/user/dashboard/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Assuming token is stored here
            },
          }
        );

        setUser(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <LoaderSpanner />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!user) {
    return <div className="error">No user data available.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="user-dashboard">
        <h1>Welcome, {user?.fullname}</h1>
        <div className="user-info">
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <PostsDisplay userId={userId} />
      </div>
    </div>
  );
};

export default UserDashboard;
