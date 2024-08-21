import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No token, authorization denied");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:5000/api/post/createpost",
        {
          title,
          content,
        },
        { headers }
      );

      console.log("Post created successfully", response.data);
      navigate("/"); // Redirect to home or another page after success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 h-screen bg-gray-100 flex justify-center items-center m-auto">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Post</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleSetTitle}
              placeholder="Enter the title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleSetContent}
              placeholder="Enter the content"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="6"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
