import { useState } from "react";

import AccountDetails from "./AccountDetails";
import AccountSettings from "./AccountSettings";
import ItemCard from "./ItemCard";
import itemImg from "../images/item.png";

const items = [
  {
    id: 1,
    title: "Item 1",
    image: itemImg,
    timeAgo: "1 hour ago",
    location: "Location 1",
    message: "Message 1",
    status: "lost",
  },
  {
    id: 2,
    title: "Item 2",
    image: itemImg,
    timeAgo: "2 hours ago",
    location: "Location 2",
    message: "Message 2",
    status: "found",
  },
  {
    id: 3,
    title: "Item 3",
    image: itemImg,
    timeAgo: "3 hours ago",
    location: "Location 3",
    message: "Message 3",
    status: "lost",
  },
];

const tabs = [
  {
    id: 1,
    title: "Posts",
    content: (
      <>
        <h1 className="text-left font-bold text-4xl mb-4">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto">
          {/* Replace the divs below with your actual Post components */}
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </>
    ),
  },
  {
    id: 2,
    title: "Account Details",
    content: (
      <>
        <h1 className="text-left font-bold text-4xl mb-4">Account Details</h1>
        <AccountDetails />
      </>
    ),
  },
  {
    id: 3,
    title: "Settings",
    content: (
      <>
        <h1 className="text-left font-bold text-4xl mb-4">Settings</h1>
        <AccountSettings />
      </>
    ),
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

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
      <div className="p-4">
        {tabs.map((tab) => (activeTab === tab.id ? tab.content : null))}
      </div>
    </div>
  );
};

export default Tabs;
