import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Success message state
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    if (!userInfo || !["admin", "staff"].includes(userInfo.role)) {
      setError("Please log in.");
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      const img = new Image();
      img.onload = () => {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const submitForm = async () => {
    const token = sessionStorage.getItem("token");
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const userId = userInfo.id;

    try {
      setIsLoading(true);
      setError(null); // Reset error before submission
      setSuccess(null); // Reset success before submission

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      const response = await fetch(
        "https://prs-server-by31.onrender.com/post/upload-product",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setIsLoading(false);
        setSuccess("Product uploaded successfully!"); // Set success message
        navigate("/admin/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setError("Failed to upload product. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="CreatePostBody">
      <section className="CreatePost">
        <h2>Upload a Product</h2>

        {error && <p className="post_response error">{error}</p>}
        {success && <p className="post_response-success">{success}</p>}

        <section>
          <div>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
            />
            <br />
            {imagePreview && (
              <div className="cover-preview">
                <img id="coverDisplay" src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="footwear">Footwear</option>
              <option value="clothes">Clothes</option>
              <option value="gadgets">Gadgets</option>
              <option value="makeup">Makeup</option>
              <option value="electronics">Electronics</option>
              <option value="appliances">Appliances</option>
              <option value="cap">Caps</option>
              <option value="female-wear">Female Wear</option>
            </select>
          </div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              required
            />
          </div>
          <button type="button" onClick={submitForm}>
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </section>
      </section>
    </div>
  );
};

export default CreatePost;
