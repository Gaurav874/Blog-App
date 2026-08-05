import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    blog: [],       // 👈 RecentBlog.jsx ke liye (Zero Breaking Change)
    blogs: [],      // Extra alias state
    yourBlogs: [],  // 👈 Dedicated state for Dashboard (YourBlog.jsx)
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlog: (state, action) => {
      // Dono arrays me update kar diya taaki RecentBlog.jsx ko instantly data mil jaye
      state.blog = action.payload;
      state.blogs = action.payload;
    },
    setYourBlogs: (state, action) => {
      // Sirf user dashboard ke blogs ke liye
      state.yourBlogs = action.payload;
    },
  },
});

export const { setLoading, setBlog, setYourBlogs } = blogSlice.actions;
export default blogSlice.reducer;