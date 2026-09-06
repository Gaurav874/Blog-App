import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '../redux/blogSlice'
import BlogCardList from './BlogCardList'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const RecentBlog = () => {
  const dispatch = useDispatch()
  const { blog = [] } = useSelector((store) => store.blog || {})
  const navigate = useNavigate()

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          'https://blog-app-ley7.vercel.app/api/v1/blog/get-published-blogs',
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllPublishedBlogs()
  }, [dispatch])

  return (
    <div className='bg-gray-100 dark:bg-gray-800 pb-10'>
      {/* Heading Section */}
      <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center'>
        <h1 className='text-4xl font-bold pt-10 dark:text-white'>Recent Blogs</h1>
        <hr className='w-24 text-center border-2 border-red-500 rounded-full' />
      </div>

      {/* Main Container with Sidebar */}
      <div className='max-w-7xl mx-auto flex gap-6 px-4 md:px-0'>
        {/* Left Side: Recent Blogs List (👈 FIX: Fixed max-height for 3 items + Scrollbar) */}
 {/* Left Side: Recent Blogs List */}
<div className='w-full md:w-[65%]'>
  {/* 👈 Yahan 'custom-scrollbar' add kar diya hai */}
  <div className='mt-10 flex flex-col gap-4 max-h-[580px] overflow-y-auto pr-3 custom-scrollbar'>
    {Array.isArray(blog) && blog.length > 0 ? (
      blog.map((item, index) => {
        return <BlogCardList blog={item} key={item._id || index} />
      })
    ) : (
      <div className="text-center text-gray-500 py-6">
        No recent blogs found.
      </div>
    )}
  </div>
</div>

        {/* Right Side: Sidebar Section */}
        <div className='bg-white hidden md:block dark:bg-gray-700 w-[350px] p-5 rounded-md mt-10 h-fit'>
          {/* Popular Categories */}
          <h1 className='text-2xl font-semibold dark:text-white'>Popular Categories</h1>
          <div className='my-5 flex flex-wrap gap-3'>
            {[
              "Blogging",
              "Web Development",
              "Digital Marketing",
              "Cooking",
              "Photography",
              "Sports",
            ].map((item, index) => {
              return (
                <Badge onClick={() => navigate(`/search?q=${item}`)} key={index} className='cursor-pointer'>
                  {item}
                </Badge>
              )
            })}
          </div>

          {/* Subscribe to Newsletter */}
          <h1 className='text-xl font-semibold dark:text-white mt-6'>
            Subscribe to Newsletter
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Get the latest posts and updates delivered straight to your inbox
          </p>
          <div className='flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5'>
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm text-gray-300"
            />
            <Button>Subscribe</Button>
          </div>

          {/* Suggested Blogs */}
          <div className='mt-7'>
            <h2 className='text-xl font-semibold mb-3 dark:text-white'>
              Suggested Blogs
            </h2>
            <ul className='space-y-3'>
              {[
                "10 tips to Master React",
                "Understanding Tailwind CSS",
                "Improve SEO in 2024",
              ].map((title, idx) => {
                return (
                  <li
                    key={idx}
                    className='text-sm dark:text-gray-100 hover:underline cursor-pointer'
                  >
                    {title}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentBlog