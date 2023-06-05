import React, { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import { HiOutlineHashtag } from "react-icons/hi";
import moment from "moment";
import DropdownMenu from "./DropdownMenu";

const ItemCard = ({ item, onItemCardClick }) => {
  const isLost = item.status === "lost";
  const statusColor = isLost ? "lostColor" : "foundColor";
  const defaultItemImage =
    "https://img.freepik.com/free-vector/flat-design-image-upload-landing-page_23-2148271993.jpg?w=1800&t=st=1685925210~exp=1685925810~hmac=c462a69438094be95540eb7ab7be30f53e853dcbdd3f4d44f304e7059846b09a";
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (item.datePosted) {
      const milliseconds = Math.floor(item.datePosted.nanoseconds / 1000000);
      const date = new Date(item.datePosted.seconds * 1000 + milliseconds); // convert to JavaScript Date object
      setTimeAgo(moment(date).fromNow()); // convert to relative time string
    }
  }, [item.datePosted]);

  return (
    <div
      className="relative flex flex-col w-[325px] sm:w-[350px] h-88 bg-white rounded-lg shadow my-3 "
      onClick={() => {}}
    >
      <div
        className="relative w-full pb-[56.25%] cursor-pointer"
        onClick={() => onItemCardClick(item)}
      >
        <img
          src={
            item.images && item.images[0] ? item.images[0] : defaultItemImage
          }
          alt={item.title}
          className="absolute inset-0 w-full h-full rounded-t-lg object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3
              className="text-lg font-bold cursor-pointer"
              onClick={() => onItemCardClick(item)}
            >
              {item.title}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center opacity-50 text-sm">
                <span>{timeAgo}</span>
              </div>
              <DropdownMenu />
            </div>
          </div>

          <div className="line-clamp-3 text-gray-600">{item.description}</div>
        </div>
        <div className="flex flex-wrap mt-2">
          {item.tags?.slice(0, 3).map((tag, index) => (
            <div
              key={index}
              className="inline-flex justify-center items-center gap-1 bg-gray-100 text-sm font-semibold text-gray-700 rounded-full px-4 py-1 max-w-full truncate mr-2 mt-2"
            >
              <HiOutlineHashtag className="w-4 h-4" />
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`uppercase font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg bg-${statusColor} absolute top-0 right-0 ${
          isLost ? "text-black" : "text-white"
        } text-sm`}
      >
        {item.status}
      </div>
    </div>
  );
};

export default ItemCard;
