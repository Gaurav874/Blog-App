import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setBlog, setLoading } from "../redux/blogSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog = [], loading } = useSelector((store) => store.blog || {});

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const createBlogHandler = async () => {
    if (!title.trim() || !category) {
      toast.error("Please fill both Title and Category!");
      return;
    }

    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);

      if (file) {
        // 👈 Fixed: Multer middleware .single("file") expect kar raha hai
        formData.append("file", file);
      }

      const res = await axios.post(
        "https://blog-app-ley7.vercel.app/api/v1/blog/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const currentBlogs = Array.isArray(blog) ? blog : [];
        dispatch(setBlog([...currentBlogs, res.data.blog]));
        toast.success(res.data.message || "Blog created successfully!");
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
      } else {
        toast.error(res.data.message || "Failed to create blog");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold dark:text-white">Let's create blog</h1>
      <p className="text-gray-400 text-sm mt-1">
        Fill in the details below to initialize your blog post.
      </p>

      <div className="mt-8 space-y-6">
        {/* Title Input */}
        <div>
          <Label className="dark:text-gray-300">Title</Label>
          <Input
            type="text"
            placeholder="Your blog name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent dark:bg-[#0f172a] dark:text-white dark:border-gray-700 mt-2"
          />
        </div>

        {/* Category Select */}
        <div>
          <Label className="dark:text-gray-300">Category</Label>
          <div className="mt-2">
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[200px] dark:bg-[#0f172a] dark:text-white dark:border-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#1e293b] dark:text-white">
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Thumbnail Image Input */}
        <div>
          <Label className="dark:text-gray-300">Thumbnail Image (Optional)</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
            className="bg-transparent dark:bg-[#0f172a] dark:text-white dark:border-gray-700 mt-2 cursor-pointer"
          />
          {file && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(file)}
                alt="Selected Thumbnail Preview"
                className="w-48 h-28 object-cover rounded-lg border dark:border-gray-700"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            disabled={loading}
            onClick={createBlogHandler}
            className="bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black font-semibold px-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;