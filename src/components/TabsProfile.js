import { useState } from "react";

import AccountDetails from "./AccountDetails";
import AccountSettings from "./AccountSettings";
import ItemCard from "./ItemCard";
import ItemDetailCard from "./ItemDetailCard";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = JSON.parse(localStorage.getItem("items"));
  const myItems = items.filter(
    (item) => item.user?.uid === JSON.parse(localStorage.getItem("user")).uid
  );
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTabContent = (id) => {
    switch (id) {
      case 1:
        return (
          <>
            <h1 className="text-left font-bold text-4xl mb-4">Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto">
              {myItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onItemCardClick={handleItemClick}
                />
              ))}
            </div>
            {isModalOpen && selectedItem && (
              <ItemDetailCard item={selectedItem} onClose={closeModal} />
            )}
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-left font-bold text-4xl mb-4">
              Account Details
            </h1>
            <AccountDetails />
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-left font-bold text-4xl mb-4">Settings</h1>
            <AccountSettings />
          </>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 1, title: "Posts" },
    { id: 2, title: "Account Details" },
    { id: 3, title: "Settings" },
  ];

  return (
    <div>
      <div className="flex w-full border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-left pl-4 py-8 px-4 text-sm font-semibold ${
              activeTab === tab.id
                ? "border-b-2 border-foundColor"
                : "text-gray-500"
            } `}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-4">{getTabContent(activeTab)}</div>
    </div>
  );
};

export default Tabs;
