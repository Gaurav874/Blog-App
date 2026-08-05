import { Button } from '../components/ui/button'
import React from 'react'
import Hero from "../components/Hero"
import RecentBlog from '../components/RecentBlog'

const Home = () => {
  return (
    <div className='pt-20'>
      <Hero/>
      <RecentBlog />
    </div>
  )
}

export default Home
