import React from "react";
import axios from "axios";

const DeleteBook = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const authToken = sessionStorage.getItem("token");
      await axios.delete(
        `https://prs-server-by31.onrender.com/post/posts/edit/${bookId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Book deleted successfully!");
      onDelete();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Book</button>
    </div>
  );
};

export default DeleteBook;
