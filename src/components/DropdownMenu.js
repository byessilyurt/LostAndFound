import { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full px-1"
      >
        <BsThreeDots className="text-gray-400 w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <AiFillEdit className="mr-3" />
            Edit
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <AiFillDelete className="mr-3" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
