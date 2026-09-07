import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import userLogo from "../assets/user.jpg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Search,
  User,
  ChartColumnBig,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaMoon, FaSun, FaRegEdit } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import ResponsiveMenu from "./ResponsiveMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);

  // New States Add-on
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`https://blog-app-ley7.vercel.app/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Search Logic Add-on
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
  <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
      {/* logo section */}
      <div className="flex gap-2 md:gap-7 items-center">
        <Link to="/">
          <div className="flex gap-1 md:gap-2 items-center">
            <img
              src="/Blogify_logo1.png"
              alt="Blogify Logo"
              className="w-8 h-8 md:w-16 md:h-16 dark:invert"
            />
            <h1 className="font-bold text-2xl md:text-4xl">Blogify</h1>
          </div>
        </Link>

        <div className="relative hidden md:block">
          <Input
            type="text"
            placeholder="Search..."
            className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="absolute right-0 top-0" onClick={handleSearch}>
            <Search />
          </Button>
        </div>
      </div>

      {/* nav section */}
      <nav className="flex md:gap-7 gap-2 md:gap-4 items-center">
        <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/blogs">
            <li>Blogs</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme Button size reduced on mobile */}
          <Button size="icon" onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>

          {user ? (
            <div className="ml-2 md:ml-7 flex gap-2 md:gap-3 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer py-1 px-3 rounded-full bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 transition-all">
                    <img
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover border border-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:block">
                      {user?.firstName || "Account"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 dark:bg-gray-800">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/your-blog")}
                    >
                      <ChartColumnBig className="mr-2 h-4 w-4" />
                      <span>Your Blog</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/write-blog")}
                    >
                      <FaRegEdit className="mr-2 h-4 w-4" />
                      <span>Write Blog</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={logoutHandler}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={logoutHandler} className="hidden md:block">
                Logout
              </Button>
            </div>
          ) : (
            <div className="ml-1 md:ml-7 flex gap-1 md:gap-2 items-center">
              <Link to="/login">
                <Button className="px-3 py-1 text-sm md:text-base">Login</Button>
              </Link>
              <Link className="hidden md:block" to="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Add-on */}
        {openNav ? (
          <HiMenuAlt3
            onClick={toggleNav}
            className="w-7 h-7 md:hidden cursor-pointer"
          />
        ) : (
          <HiMenuAlt1
            onClick={toggleNav}
            className="w-7 h-7 md:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* Mobile Responsive Menu Add-on */}
      <ResponsiveMenu
        openNav={openNav}
        setOpenNav={setOpenNav}
        logoutHandler={logoutHandler}
      />
    </div>
  </div>
);
};

export default Navbar;
