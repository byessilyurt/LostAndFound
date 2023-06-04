import React, { useRef } from "react";
import { MdEdit } from "react-icons/md";
import { uploadProfilePic, defaultImage } from "../firebase/utils";

const HeroProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { displayName, email, photoURL, uid } = user;
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      uploadProfilePic(uid, e.target.files[0]);
    }
  };

  return (
    <div className="bg-gray-100 h-80 w-full flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={photoURL || defaultImage}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-lostColor"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
          />
          <button
            className="absolute bottom-1 right-1 bg-lostColor text-black p-2 rounded-full"
            onClick={handleEditClick}
          >
            <MdEdit className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-1">{displayName}</h2>
        <p className="text-base text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default HeroProfile;
