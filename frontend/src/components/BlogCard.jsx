import React from 'react'
// import { Button } from '../components/ui/button'
// import { Button } from '../components/ui/button'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const navigate = useNavigate()

  // Date formatting (en-GB: e.g. 31/07/2026)
  const date = blog?.createdAt ? new Date(blog.createdAt) : new Date()
  const formattedDate = date.toLocaleDateString("en-GB")

  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all flex flex-col justify-between">
      <div>
        {/* Blog Thumbnail Image */}
        <img
          src={blog?.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={blog?.title || "Blog Image"}
          className="w-full h-48 object-cover rounded-lg"
        />

        {/* Author, Category, Date Details */}
        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
          By {blog?.author?.firstName || "Author"} | {blog?.category || "General"} | {formattedDate}
        </p>

        {/* Title */}
        <h2 className="text-xl font-semibold mt-2 dark:text-white line-clamp-1">
          {blog?.title}
        </h2>

        {/* Subtitle */}
        <h3 className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">
          {blog?.subtitle}
        </h3>
      </div>

      {/* Read More Button */}
      <div className="mt-4">
        <Button
          onClick={() => navigate(`/blogs/${blog?._id}`)}
          className="px-4 py-2 rounded-lg text-sm"
        >
          Read More
        </Button>
      </div>
    </div>
  )
}

export default BlogCard