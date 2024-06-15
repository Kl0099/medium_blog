import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKENDURL } from "../config";
import Skeleton from "react-loading-skeleton";
import { FaPencilAlt } from "react-icons/fa";
import { BlogInputes } from "common-zod-module";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
export const Blog = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [edit, setEdit] = useState(false);
  // const blogs = useRecoilValue(BlogAtom);
  const [blog, setBlog] = useState<Blog>({
    author: { name: "" },
    id: "",
    title: "",
    content: "",
    createdAt: "",
  });

  const [postInput, setPostInput] = useState<BlogInputes>({
    title: blog?.title,
    content: blog?.content,
  });

  interface Blog {
    authorId?: string;
    author: { name: string };
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }

  const updateBlog = async () => {
    const token = localStorage.getItem("token") || "";
    setLoading(true);
    try {
      const response = await axios.put(
        `${BACKENDURL}/api/v1/blog`,
        { title: postInput.title, content: postInput.content, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setBlog(response.data.blog);
        toast.success("Blog updated successfully");
      }
    } catch (error) {
      toast.error("error while updating blog");
      console.log("error while updating blog : ", error);
    }
    setLoading(false);
    setEdit(false);
  };

  const getBlog = async () => {
    const token = localStorage.getItem("token") || "";
    console.log(token);
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/v1/blog/${id}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response) {
        setBlog(response.data.blog);
        setLoading(false);
      }
    } catch (error) {
      console.log("error while get blog : ", error);
    }
  };

  const editblogpage = async () => {
    setEdit(true);
  };
  useEffect(() => {
    getBlog();
  }, [id]);
  useEffect(() => {
    if (blog) {
      const token = localStorage.getItem("token") || "";
      const decode = jwtDecode(token);
      //@ts-ignore
      if (decode.id === blog.authorId) {
        setIsUser(true);
      }
      setPostInput({
        title: blog.title,
        content: blog.content,
      });
    }
  }, [blog]);
  if (loading) {
    return (
      <div className="container border-none mx-auto p-4">
        <div className="mb-4 md:w-[40%] mx-auto">
          <Skeleton
            height={30}
            width="60%"
            style={{ marginBottom: "10px" }}
          />
          <Skeleton
            height={20}
            count={9}
          />
        </div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center mx-auto  p-4">
      <div className="bg-white shadow-md mx-auto w-[40%]  container rounded-lg p-6">
        {edit && <h1 className=" text-center mb-4">Edit your blog</h1>}
        {edit ? (
          <div className=" font-bold mb-2">
            <input
              type="text"
              value={postInput.title}
              className=" border p-2 "
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  title: e.target.value,
                });
              }}
            />
          </div>
        ) : (
          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        )}
        {!edit && (
          <div className="flex flex-row justify-between items-center  mb-7">
            <p className="text-gray-600 ">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            {isUser && (
              <FaPencilAlt
                className=" hover:scale-95 cursor-pointer"
                size={22}
                onClick={editblogpage}
              />
            )}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="w-full">
            {edit ? (
              <textarea
                className="w-full h-[400px] border p-2"
                value={postInput.content}
                onChange={(e) => {
                  setPostInput({
                    ...postInput,
                    content: e.target.value,
                  });
                }}
              />
            ) : (
              <p className="text-gray-800 text-prewrap">{blog.content}</p>
            )}
          </div>
        </div>
        {edit && (
          <div className=" flex gap-3">
            <button
              onClick={updateBlog}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Publish
            </button>
            <button
              onClick={() => setEdit(false)}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Cencel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
