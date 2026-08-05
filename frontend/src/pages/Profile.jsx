import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import userLogo from "../assets/user.jpg";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* User Avatar & Social Links */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-gray-300 dark:border-gray-600 shadow-md">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="Profile"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {user?.role || "Web Developer"}
          </h2>

          <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-400 mt-1">
            <FaFacebook className="hover:text-blue-600 cursor-pointer transition-colors" />
            <FaLinkedin className="hover:text-blue-500 cursor-pointer transition-colors" />
            <FaGithub className="hover:text-black dark:hover:text-white cursor-pointer transition-colors" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* User Details */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome {user?.fullname || "User"}!
          </h1>

          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Email :
            </p>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
              {user?.email || "user@gmail.com"}
            </p>
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              About Me
            </p>
            <div className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {user?.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;