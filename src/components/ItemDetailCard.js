import React from "react";
import { useNavigate } from 'react-router-dom';

function ItemDetailCard({ item, onClose, currentUser, itemOwner }) {
  const Navigate = useNavigate();

  const handleChatButton = () => {
    Navigate(`/conversation/neLK1eOAJQVkxbWchqtqq8sSWM32`);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-screen-lg mx-auto bg-gray-300 rounded-lg overflow-hidden shadow-md flex items-center">
        <img
          className="w-3/4 object-cover object-center"
          src={item.image}
          alt={item.title} 
        />
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
          <p className="text-lg font-medium mb-4">{item.message}</p>
          <div className="text-lg font-medium mb-4">
            {item.status === "lost" ? (
              <span className="bg-red-500 text-white py-1 px-2 rounded mr-2">
                Lost
              </span>
            ) : (
              <span className="bg-green-500 text-white py-1 px-2 rounded mr-2">
                Found
              </span>
            )}
            {item.timeAgo}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Location:</h3>
            <p className="text-gray-700">{item.location}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Description:</h3>
            <p className="text-gray-700">{item.message}</p>
          </div>
          <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleChatButton}
    >
      Chat
    </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailCard;