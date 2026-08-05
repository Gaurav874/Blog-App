import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import YourBlogs from './pages/YourBlogs'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/UpdateBlog'
import BlogView from './pages/BlogView'
import Footer from './components/Footer'
import SearchList from './pages/SearchList'
const router = createBrowserRouter([
  {
    path: "/",
    element: (<><Navbar /><Home /><Footer/></>),
  },
  {
    path: "/blogs",
    element: (<><Navbar /><Blogs /><Footer/></>),
  },
  {
    path: "/blogs/:blogId", // 👈 2. Main Public Blog Reader Route
    element: (<><Navbar /><BlogView /></>),
  },
  {
    path: "/about",
    element: (<><Navbar /><About /><Footer/></>),
  },
  {
    path: "/search",
    element: (<><Navbar /><SearchList /><Footer/></>),
  },
  {
    path: "/login",
    element: (<><Navbar /><Login /></>),
  },
  {
    path: "/signup",
    element: (<><Navbar /><Signup /></>),
  },
  {
    path: "/dashboard",
    element: (<><Navbar /><Dashboard /></>),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "your-blog",
        element: <YourBlogs />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "write-blog", // 👈 Added dynamic :blogId for editing created blog
        element: <CreateBlog />,
      },
      {
        path: "write-blog/:blogId", // 👈 2. Dynamic Edit Route Updated
        element: <UpdateBlog />,
      },
      {
        path: ":blogId", // 👈 3. Dashboard Route Fix (agar dashboard me read karna ho)
        element: <BlogView />,
      },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;