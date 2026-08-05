import React, { useRef, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import axios from "axios";
import { setBlog, setLoading } from "../redux/blogSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.blogId;

  const { blog = [], loading } = useSelector((store) => store.blog || {});

  const selectBlog = Array.isArray(blog)
    ? blog.find((b) => b._id === id)
    : null;

  const [content, setContent] = useState("");
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    category: "",
    thumbnail: null,
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    if (selectBlog) {
      setContent(selectBlog.description || "");
      setBlogData({
        title: selectBlog.title || "",
        subtitle: selectBlog.subtitle || "",
        category: selectBlog.category || "",
        thumbnail: null,
      });
      setPreviewThumbnail(selectBlog.thumbnail || "");
      setPublish(selectBlog.isPublished || false);
    }
  }, [selectBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("subtitle", blogData.subtitle);
      formData.append("description", content);
      formData.append("category", blogData.category);

      if (blogData.thumbnail) {
        // 👈 Fixed: Multer middleware ke according "file" key name pass kiya
        formData.append("file", blogData.thumbnail);
      }

      // 👈 Fixed: Route path alignment (Agar backend router.route("/:blogId").put(...) use kar raha ho toh URL fix kar dena)
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Blog updated successfully!");
        navigate("/dashboard/your-blog");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating blog");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePublishUnpublish = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/blog/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setPublish(!publish);
        toast.success(res.data.message || "Status updated successfully!");
        navigate("/dashboard/your-blog");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem._id !== id);
        dispatch(setBlog(updatedBlogData));

        toast.success(res.data.message || "Blog deleted successfully!");
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex-1">
      <Card className="border-none shadow-none bg-transparent p-0 space-y-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            Basic Blog Information
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Make changes to your blogs here. Click save when you are done.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-x-2">
          <Button onClick={togglePublishUnpublish}>
            {selectBlog?.isPublished ? "UnPublish" : "Publish"}
          </Button>

          <Button variant="destructive" onClick={deleteBlog}>
            Remove blog
          </Button>
        </div>

        {/* Title Input */}
        <div className="pt-4">
          <Label className="mb-2 block dark:text-gray-300">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter a title"
            value={blogData.title}
            onChange={handleChange}
            className="dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
          />
        </div>

        {/* Subtitle Input */}
        <div>
          <Label className="mb-2 block dark:text-gray-300">Subtitle</Label>
          <Input
            type="text"
            name="subtitle"
            placeholder="Enter a subtitle"
            value={blogData.subtitle}
            onChange={handleChange}
            className="dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
          />
        </div>

        {/* Description Editor (JoditEditor) */}
        <div>
          <Label className="mb-2 block dark:text-gray-300">Description</Label>
          <div className="text-black">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>

        {/* Category Select */}
        <div>
          <Label className="mb-2 block dark:text-gray-300">Category</Label>
          <Select
            value={blogData.category}
            onValueChange={selectCategory}
          >
            <SelectTrigger className="w-[180px] dark:bg-[#0f172a] dark:text-white dark:border-gray-700">
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

        {/* Thumbnail Upload & Image Preview */}
        <div>
          <Label className="mb-2 block dark:text-gray-300">Thumbnail</Label>
          <Input
            type="file"
            id="file"
            accept="image/*"
            onChange={selectThumbnail}
            className="w-fit dark:border-gray-700 cursor-pointer"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              alt="Blog Thumbnail"
              className="w-64 my-4 rounded-md object-cover border dark:border-gray-700"
            />
          )}
        </div>

        {/* Bottom Back & Save Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button disabled={loading} onClick={updateBlogHandler}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateBlog;