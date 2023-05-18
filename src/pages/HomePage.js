import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import ItemDetailCard from "../components/ItemDetailCard";
import { items } from "../data/index.js";
import { FaSearch } from "react-icons/fa";

function HomePage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [numItemsToShow, setNumItemsToShow] = useState(6); // Add this line

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredData = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const loadMoreItems = () => {
    // Add this function
    setNumItemsToShow(numItemsToShow + 6);
  };

  return (
    <div className="p-4">
      <div className="relative w-1/2 mx-auto my-5">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search items..."
          className="p-2 mb-4 border border-gray-200 rounded w-full pl-10"
        />
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
      </div>
      {filteredData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto">
            {filteredData.slice(0, numItemsToShow).map(
              (
                item // Use slice to limit the number of items
              ) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onItemCardClick={handleItemClick}
                />
              )
            )}
          </div>
          {isModalOpen && selectedItem && (
            <ItemDetailCard item={selectedItem} onClose={closeModal} />
          )}

          {filteredData.length > numItemsToShow && (
            <div className="flex justify-center">
              <button
                onClick={loadMoreItems}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded font-medium"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">No items found.</div>
      )}
    </div>
  );
}

export default HomePage;
