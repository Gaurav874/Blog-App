import BlogCard from '../components/BlogCard'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const SearchList = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('q') || ''
  const { blog = [] } = useSelector((store) => store.blog || {})

  // Filtering blogs based on title, subtitle, and category
  const filteredBlogs = Array.isArray(blog)
    ? blog.filter((item) => {
        const searchQuery = query.toLowerCase()
        const titleMatch = item?.title?.toLowerCase().includes(searchQuery)
        const subtitleMatch = item?.subtitle?.toLowerCase().includes(searchQuery)
        const categoryMatch = item?.category?.toLowerCase() === searchQuery

        return titleMatch || subtitleMatch || categoryMatch
      })
    : []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='pt-32'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='mb-5 text-2xl font-bold dark:text-white'>
          Search result for: "{query}"
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-7 my-10'>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item, index) => {
              return <BlogCard blog={item} key={item._id || index} />
            })
          ) : (
            <div className='col-span-full text-center text-gray-500 py-10'>
              No blogs found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchList