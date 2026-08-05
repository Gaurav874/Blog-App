import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '../redux/blogSlice'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  const dispatch = useDispatch()
  const { blog = [] } = useSelector((store) => store.blog || {})

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/blog/get-published-blogs",
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
    <div className='pt-16 min-h-screen pb-10'>
      {/* Header Section */}
      <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
        <h1 className='text-4xl font-bold text-center pt-10 dark:text-white'>Our Blogs</h1>
        <hr className='w-24 text-center border-2 border-red-500 rounded-full' />
      </div>

      {/* Blogs Grid Container */}
      <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0'>
        {Array.isArray(blog) && blog.length > 0 ? (
          blog.map((item, index) => {
            return <BlogCard blog={item} key={item._id || index} />
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No published blogs found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs