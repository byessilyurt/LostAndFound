import React from "react";

function ItemDetailPaage({ item }) {
  return (
    <div class="max-w-screen-lg mx-auto bg-gray-300 rounded-lg overflow-hidden shadow-md flex items-center">
      <img
        class="w-3/4 object-cover object-center"
        src={item.image}
        alt={item.name}
      />
      <div class="w-1/2 p-8">
        <h2 class="text-2xl font-bold mb-2">{item.name}</h2>
        <p class="text-lg font-medium mb-4">{item.postedBy}</p>
        <div class="text-lg font-medium mb-4">
          {item.lostOrFound === "lost" ? (
            <span class="bg-red-500 text-white py-1 px-2 rounded mr-2">
              Lost
            </span>
          ) : (
            <span class="bg-green-500 text-white py-1 px-2 rounded mr-2">
              Found
            </span>
          )}
          {item.date}
        </div>
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-2">Location:</h3>
          <p class="text-gray-700">{item.location}</p>
        </div>
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-2">Description:</h3>
          <p class="text-gray-700">{item.description}</p>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            // hwe should add contact functionality here
          }}
        >
          Contact
        </button>
      </div>
    </div>
  );
}

export default ItemDetailPaage;