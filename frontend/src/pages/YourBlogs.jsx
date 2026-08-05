import React, { useEffect } from "react";
import { Card } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../redux/blogSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const YourBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store se user ke blogs extract karo
  const { blog = [] } = useSelector((store) => store.blog || {});

  // API Call: User ke blogs fetch karne ke liye
  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/blog/get-own-blogs",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Blog Handler Function
  const deleteBlogHandler = async (blogId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${blogId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Blog deleted successfully");
        getOwnBlog(); // Refresh list after delete
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex-1">
      <Card className="border-none shadow-none bg-transparent p-0 space-y-4">
        <Table>
          <TableCaption>A list of your recent blogs.</TableCaption>
          <TableHeader>
            <TableRow className="dark:border-gray-700">
              <TableHead className="dark:text-gray-300">Title</TableHead>
              <TableHead className="dark:text-gray-300">Category</TableHead>
              <TableHead className="dark:text-gray-300">Date</TableHead>
              <TableHead className="text-center dark:text-gray-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(blog) && blog.length > 0 ? (
              blog.map((item, index) => {
                // Formatted Date
                const formattedDate = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A";

                return (
                  <TableRow key={item._id || index} className="dark:border-gray-700">
                    {/* Thumbnail Image + Title */}
                    <TableCell className="flex gap-4 items-center">
                      <img
                        src={
                          item.thumbnail ||
                          "https://via.placeholder.com/150?text=Blog"
                        }
                        alt={item.title}
                        className="w-20 h-12 object-cover rounded-md hidden md:block border dark:border-gray-700"
                      />
                      <h1
                        onClick={() =>
                          navigate(`/dashboard/${item._id}`)
                        }
                        className="font-medium hover:underline cursor-pointer dark:text-white line-clamp-1"
                      >
                        {item.title}
                      </h1>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="dark:text-gray-300">
                      {item.category || "General"}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="dark:text-gray-300">
                      {formattedDate}
                    </TableCell>

                    {/* Action Dropdown Menu */}
                    <TableCell className="text-center dark:text-gray-300">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                            <BsThreeDotsVertical className="cursor-pointer" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="dark:bg-[#1e293b] dark:text-white dark:border-gray-700"
                        >
                          {/* Edit Item */}
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/dashboard/write-blog/${item._id}`)
                            }
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>

                          {/* Delete Item */}
                          <DropdownMenuItem
                            onClick={() => deleteBlogHandler(item._id)}
                            className="cursor-pointer text-red-500 focus:text-red-500 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-6"
                >
                  No blogs found. Create your first blog!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default YourBlog;