import React from "react";
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

const AccountSettings = () => {
  const settingsOptions = [
    {
      id: 1,
      title: "Notification Preferences",
      content: "Email, Push, and SMS notifications",
    },
    {
      id: 2,
      title: "Delete Account",
      content: "Permanently delete your account",
    },
  ];

  return (
    <div className="mt-10">
      <div className="bg-white rounded-lg p-6 shadow-xl">
        {settingsOptions.map((option) => (
          <div
            key={option.id}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <div className="text-base text-gray-600 mb-1">{option.title}</div>
              <div className="text-xl font-semibold">{option.content}</div>
            </div>
            <button
              className="flex items-center justify-center text-black border border-mintGreen py-2 px-6 rounded-md"
              type="button"
            >
              {/* if it is delete button make it delete icon */}
              {option.id === 2 ? (
                <div className="text-lostColor flex items-center justify-center">
                  <AiFillDelete className="mr-1" />
                  Delete
                </div>
              ) : (
                <>
                  <RiEditBoxFill className="mr-1" />
                  Change
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettings;