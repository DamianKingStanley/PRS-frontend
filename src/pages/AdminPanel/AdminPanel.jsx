import React, { useState } from "react";
import axios from "axios";
import Search from "../../component/AdminComponent/Search";
import "./AdminPanel.css"; // Ensure to import the CSS file

const AdminPanel = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");

  const handleSearchResults = (results) => {
    setBooks(results);
  };

  const handleSelectBook = (book, action) => {
    setSelectedBookId(book._id);
    setSelectedBook(book);
    if (action === "edit") {
      setTitle(book.title);
      setPrice(book.price);
      setAuthor(book.author);
      setIsUpdating(true);
    } else if (action === "delete") {
      setShowDeleteModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    try {
      const authToken = sessionStorage.getItem("token");
      await axios.delete(
        `https://prs-server-by31.onrender.com/post/posts/edit/${selectedBookId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Book deleted successfully!");
      setShowDeleteModal(false);
      setSelectedBookId(null);
      setSelectedBook(null);
      setBooks(books.filter((book) => book._id !== selectedBookId)); // Remove the deleted book from the list
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const authToken = sessionStorage.getItem("token");
      await axios.put(
        `https://prs-server-by31.onrender.com/post/posts/edit/${selectedBookId}`,
        { title, price, author },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Book updated successfully!");
      setIsUpdating(false);
      setSelectedBookId(null);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      <div className="searchforbooks">
        <h3>Find a Book</h3>

        <Search onSearch={handleSearchResults} />
      </div>
      <div className="displaySearchedBooks">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-item">
              <img
                src={`https://prs-server-by31.onrender.com/${book.bookcover}`}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>Department: {book.selectedDepartment}</p>
                <p>College: {book.selectedCollege}</p>
                <p>Level: {book.selectedLevel}</p>
                <p>Price: {book.price}</p>
                <p>Author: {book.author || "Unknown"}</p>
                <div className="button-container">
                  <button
                    id="adminEditBtn"
                    onClick={() => handleSelectBook(book, "edit")}
                  >
                    Edit
                  </button>
                  <button
                    id="adminDeleteBtn"
                    onClick={() => handleSelectBook(book, "delete")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
      {isUpdating && (
        <div className="update-modal-overlay">
          <div className="update-modal-content">
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
              <button
                id="adminConfirmUpdateBtn"
                type="button"
                onClick={handleUpdate}
              >
                Update Book
              </button>
            </form>
            <button className="update-close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h3>Confirm you want to delete?</h3>
            <div className="delete-modal-buttons">
              <button
                id="adminConfirmDeleteBtn"
                onClick={handleDelete}
                className="confirm-button"
              >
                Yes, delete!
              </button>
              <button
                id="admiconfirmDeleteCancel"
                onClick={handleCloseModal}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
