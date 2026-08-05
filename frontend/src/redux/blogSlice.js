import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    blogs: [],      // Saare published blogs ke liye
    yourBlogs: [],  // Sirf logged-in user ke blogs ke liye
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlog: (state, action) => {
      state.blogs = action.payload;
    },
    setYourBlogs: (state, action) => {
      state.yourBlogs = action.payload; // 👈 Dedicated action user blogs ke liye
    },
  },
});

export const { setLoading, setBlog, setYourBlogs } = blogSlice.actions;
export default blogSlice.reducer;