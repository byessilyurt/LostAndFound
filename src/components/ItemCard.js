import React from "react";
import { IoMdTime } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";

import DropdownMenu from "./DropdownMenu";

const ItemCard = ({ item }) => {
  const isLost = item.status === "lost";
  const statusColor = isLost ? "lostColor" : "foundColor";

  return (
    <div className="relative w-[350px] h-88 bg-white rounded-lg shadow">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-40 rounded-t-lg"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <DropdownMenu />
        </div>
        <div className="flex items-center text-sm font-semibold text-gray-500">
          <IoMdTime className="mr-1 w-2.5 h-2.5" />
          <span>{item.timeAgo}</span>
          <span className={`mx-2 w-1 h-1 rounded-full bg-${statusColor}`} />
          <span>{item.location}</span>
        </div>
      </div>
      <div
        className={`inline-flex justify-center items-center gap-1 bg-gray-100 text-sm font-semibold text-gray-700 rounded-full px-4 py-1 max-w-full truncate my-4 mx-4`}
      >
        <RiErrorWarningLine className={`mr-1 text-${statusColor} w-3 h-3`} />
        <span className="truncate">{item.message}</span>
      </div>

      <div
        className={`uppercase font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg bg-${statusColor} absolute top-0 right-0 ${
          item.status.toLowerCase() === "lost" ? "text-black" : "text-white"
        } text-sm`}
      >
        {item.status}
      </div>
    </div>
  );
};

export default ItemCard;
