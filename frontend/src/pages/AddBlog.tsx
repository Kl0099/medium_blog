import axios from "axios";
import { BlogInputes } from "common-zod-module";
import { useState } from "react";
import { BACKENDURL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddBlog = () => {
  const [postInput, setPostInput] = useState<BlogInputes>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const addBlog = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/v1/blog`,
        {
          title: postInput.title,
          content: postInput.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        navigate(`/blog/${response.data.blogid}`);
        toast.success("blog added successfully");
      }
    } catch (error) {
      toast.error("something went wrong!!!");
      console.log("error while creating the blog : ", error);
    }
  };
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <input
            onChange={(e) =>
              setPostInput({
                ...postInput,
                title: e.target.value,
              })
            }
            type="text"
            className="w-full p-2 focus:border-none text-4xl font-semibold text-gray-800 placeholder-gray-400 border-none focus:ring-0"
            placeholder="Title"
          />
        </div>
        <textarea
          onChange={(e) =>
            setPostInput({
              ...postInput,
              content: e.target.value,
            })
          }
          className="w-full p-2 h-64 focus:border-none text-xl text-gray-600 placeholder-gray-400 resize-none border-none focus:ring-0"
          placeholder="Tell your story..."
        ></textarea>
        <button
          onClick={addBlog}
          disabled={loading}
          className="bg-black rounded-md text-white py-2 px-4  hover:bg-gray-800"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
