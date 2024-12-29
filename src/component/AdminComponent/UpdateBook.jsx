import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBook = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const authToken = sessionStorage.getItem("token");
        const response = await axios.get(
          `https://prs-server-by31.onrender.com/post/post/${bookId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setBook(response.data);
        setTitle(response.data.title);
        setPrice(response.data.price);
        setAuthor(response.data.author);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleUpdate = async () => {
    try {
      const authToken = sessionStorage.getItem("token");
      await axios.put(
        `https://prs-server-by31.onrender.com/post/posts/edit/${bookId}`,
        { title, price, author },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleUpdate}>
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
