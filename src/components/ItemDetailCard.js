import React from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { HiOutlineHashtag } from "react-icons/hi";

function ItemDetailCard({ item, onClose }) {
  const navigate = useNavigate();
  const isLost = item.status === "lost";
  const statusColor = isLost ? "lostColor" : "foundColor";

  const handleChatButton = () => {
    navigate(`/chats/${item.user?.uid}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-auto bg-white rounded-lg overflow-hidden shadow-md w-4/5 h-4/5 flex sm:flex-row">
        <div className="relative lg:w-3/5">
          <img
            className="w-full h-full object-cover object-center"
            src={item.images && item.images[0]}
            alt={item.title}
          />
          <div
            className={`uppercase font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg bg-${statusColor} absolute top-0 right-0 ${
              isLost ? "text-black" : "text-white"
            } text-sm`}
          >
            {item.status}
          </div>
        </div>
        <div className="w-full p-8 sm:w-2/5 md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded"
                onClick={onClose}
              >
                <FiX />
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {item.tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex justify-center items-center gap-1 bg-gray-100 text-sm font-semibold text-gray-700 rounded-full px-4 py-1 max-w-full truncate mr-2 mt-2"
                >
                  <HiOutlineHashtag className="w-4 h-4" />
                  {tag}
                </div>
              ))}
            </div>
            <div className="mb-4 shadow-xl border p-4 rounded bg-white bg-opacity-50 overflow-auto max-h-48">
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
          <button
            className={`${
              isLost ? "bg-lostColor" : "bg-foundColor"
            }  text-white font-bold py-2 px-4 rounded w-1/2 self-center hover:bg-opacity-80`}
            onClick={handleChatButton}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailCard;
