import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import userLogo from "../assets/user.jpg";
import { FaMoon, FaSun, FaRegEdit } from "react-icons/fa";
import { User, ChartColumnBig, LogOut } from "lucide-react";
import { LiaCommentSolid } from "react-icons/lia";
import { toggleTheme } from "../redux/themeSlice";

const ResponsiveMenu = ({ openNav, setOpenNav, logoutHandler }) => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenNav(false);
  };

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed top-0 bottom-0 z-50 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 px-8 pb-6 pt-16 text-black dark:text-white transition-all duration-300 md:hidden border-r dark:border-gray-700 shadow-md`}
    >
      <div className="flex flex-col gap-6">
        {/* User Info Header */}
        {user ? (
          <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.photoUrl || userLogo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg">{user?.fullname || "User"}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 pb-4 border-b dark:border-gray-700">
            <Link to="/login" onClick={handleClose} className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
            <Link to="/signup" onClick={handleClose} className="w-full">
              <Button variant="outline" className="w-full">
                Signup
              </Button>
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="mt-2">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <NavLink to="/" onClick={handleClose}>
              <li className="hover:text-blue-500 transition-colors">Home</li>
            </NavLink>
            <NavLink to="/blogs" onClick={handleClose}>
              <li className="hover:text-blue-500 transition-colors">Blogs</li>
            </NavLink>
            <NavLink to="/about" onClick={handleClose}>
              <li className="hover:text-blue-500 transition-colors">About</li>
            </NavLink>

            {/* Dashboard Links for Mobile */}
            {user && (
              <div className="flex flex-col gap-3 pt-4 border-t dark:border-gray-700">
                <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">
                  Dashboard
                </p>
                <NavLink
                  to="/dashboard/profile"
                  onClick={handleClose}
                  className="flex items-center gap-2 text-base hover:text-blue-500"
                >
                  <User size={18} />
                  <span>Profile</span>
                </NavLink>
                <NavLink
                  to="/dashboard/your-blog"
                  onClick={handleClose}
                  className="flex items-center gap-2 text-base hover:text-blue-500"
                >
                  <ChartColumnBig size={18} />
                  <span>Your Blog</span>
                </NavLink>
                <NavLink
                  to="/dashboard/comments"
                  onClick={handleClose}
                  className="flex items-center gap-2 text-base hover:text-blue-500"
                >
                  <LiaCommentSolid size={18} />
                  <span>Comments</span>
                </NavLink>
                <NavLink
                  to="/dashboard/write-blog"
                  onClick={handleClose}
                  className="flex items-center gap-2 text-base hover:text-blue-500"
                >
                  <FaRegEdit size={18} />
                  <span>Write Blog</span>
                </NavLink>
              </div>
            )}
          </ul>
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col gap-4 pt-4 border-t dark:border-gray-700">
        <Button
          variant="outline"
          onClick={() => dispatch(toggleTheme())}
          className="flex justify-between items-center w-full"
        >
          <span>Theme</span>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {user && (
          <Button
            variant="destructive"
            onClick={() => {
              handleClose();
              logoutHandler();
            }}
            className="flex items-center gap-2 w-full justify-center"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResponsiveMenu;