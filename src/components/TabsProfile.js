import { useState } from "react";

const tabs = [
  {
    id: 1,
    title: "Posts",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Replace the divs below with your actual Post components */}
        <div className="bg-gray-300 h-24"></div>
        <div className="bg-gray-300 h-24"></div>
        <div className="bg-gray-300 h-24"></div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Account Details",
    content: <p>Dummy text for account details</p>,
  },
  { id: 3, title: "Settings", content: <p>Dummy text for settings</p> },
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
