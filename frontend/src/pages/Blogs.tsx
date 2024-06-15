import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { BACKENDURL } from "../config";
import { useRecoilState } from "recoil";
import { BlogAtom } from "../Atoms/atom";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const Blogs = () => {
  type Blog = {
    id: string;
    author: { name: string };
    title: string;
    createdAt: string;
    content: string;
  };

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  //@ts-ignore
  const [todoList, setTodoList] = useRecoilState(BlogAtom);

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/api/v1/blog/bulk`);
      // console.log(response.data.blog);
      if (response.data) {
        setBlogs(response.data.blog);
        setTodoList(response.data.blog);
        // console.log("Blog Atom : ", todoList);
      }
    } catch (error) {
      toast.error("error while fetching blogs");
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container border-none mx-auto p-4">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="mb-4 md:w-[40%] mx-auto"
            >
              <Skeleton
                height={30}
                width="60%"
                style={{ marginBottom: "10px" }}
              />
              <Skeleton
                height={20}
                count={3}
              />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="container border-none mx-auto p-4">
      {blogs.length > 0 ? (
        blogs?.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog?.id}
            authorName={blog?.author?.name}
            title={blog.title}
            publishedDate={blog.createdAt}
            content={blog.content}
          />
        ))
      ) : (
        <div>No blogs available</div> // Show message if no blogs are available
      )}
    </div>
  );
};

export default Blogs;
