import React from "react";

interface BlogCard {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({ authorName, title, content, publishedDate }: BlogCard) => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
          <span>{authorName}</span>
          <span>{publishedDate}</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default BlogCard;
