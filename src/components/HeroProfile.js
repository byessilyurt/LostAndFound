import React from "react";
import profileImage from "../images/profile.jpg";
import { MdEdit } from "react-icons/md";

const HeroProfile = () => {
  return (
    <div className="bg-gray-100 h-80 w-full flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-red-300"
          />
          <button className="absolute bottom-1 right-1 bg-red-300 text-black p-2 rounded-full">
            <MdEdit className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-1">User Name</h2>
        <p className="text-base text-gray-600">user.email@example.com</p>
      </div>
    </div>
  );
};

export default HeroProfile;
