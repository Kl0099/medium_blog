import { Link } from "react-router-dom";
import "../index.css";
interface BlogCard {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
import "react-loading-skeleton/dist/skeleton.css";

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCard) => {
  return (
    <div className="max-w-lg mb-5 mx-auto bg-white  border-b border-b-grey-700 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
          <div className="flex items-center">
            <Avatar name={authorName} />
            <span className="ml-2 text-md">{authorName}</span>
          </div>
          <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </div>
        <Link
          to={`/blog/${id}`}
          className="text-lg font-bold  text-gray-900 mb-2"
        >
          {title}
        </Link>
        <Link
          to={`/blog/${id}`}
          className="text-gray-700 truncate-lines"
        >
          {content}
        </Link>
        <p className="text-gray-700  text-sm mt-5">{`${Math.ceil(
          content.length / 100
        )} min read`}</p>
      </div>
    </div>
  );
};

function Avatar({ name }: { name: string }) {
  const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${
    name.split(" ")[0]
  } ${name.split(" ")[1]}`;

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      <img
        src={userImage}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default BlogCard;
