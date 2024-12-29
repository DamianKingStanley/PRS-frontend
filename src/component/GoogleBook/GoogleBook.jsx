import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GoogleBook.css";

const GoogleBook = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchDefaultBooks = async () => {
      try {
        const response = await axios.get(
          "https://prs-server-by31.onrender.com/post/googlebook/fetch"
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching default books:", error);
      }
    };

    fetchDefaultBooks();
  }, []);

  const searchBooks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://prs-server-by31.onrender.com/post/googlebook/search?query=${query}`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };

  const shortenDescription = (description) => {
    if (!description) return "";
    return description.split(" ").slice(0, 20).join(" ") + "...";
  };

  return (
    <div className="GoogleBookComponent">
      <form className="GoogleBookSearch" onSubmit={searchBooks}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
        />
        <button type="submit">Search</button>
      </form>

      <div className="GoogleBookDisplay">
        {books.map((book) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
            />
            <p>{shortenDescription(book.volumeInfo.description)}</p>
            <a
              href={book.volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleBook;
