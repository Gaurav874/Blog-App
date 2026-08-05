import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate()

  return (
    <div className='bg-white dark:bg-[#1e293b] dark:border-gray-700 flex flex-col md:flex-row items-center md:gap-8 p-5 rounded-2xl shadow-lg border transition-all'>
      {/* Left Image Section */}
      <div className='w-full md:w-auto flex-shrink-0'>
        <img
          src={blog?.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={blog?.title || "Blog Image"}
          className='rounded-xl w-full md:w-[280px] h-44 object-cover hover:scale-105 transition-all'
        />
      </div>

      {/* Right Content Section */}
      <div className="flex flex-col justify-between w-full mt-4 md:mt-0 h-full">
        <div>
          <h2 className='text-xl md:text-2xl font-semibold dark:text-white line-clamp-2'>
            {blog?.title}
          </h2>
          <h3 className='text-gray-500 dark:text-gray-400 mt-2 text-sm line-clamp-2'>
            {blog?.subtitle}
          </h3>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => navigate(`/blogs/${blog?._id}`)}
            className='px-5 py-2 rounded-lg text-sm bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black'
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogCardList