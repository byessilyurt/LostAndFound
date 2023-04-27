import React from "react";
import { RiEditBoxFill } from "react-icons/ri";

const AccountSettings = () => {
  const settingsOptions = [
    {
      id: 1,
      title: "Notification Preferences",
      content: "Configure your notification settings",
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
              <RiEditBoxFill className="mr-1" />
              Change
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettings;
