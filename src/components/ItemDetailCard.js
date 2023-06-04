import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import moment from "moment";
import { HiOutlineHashtag } from "react-icons/hi";

function ItemDetailCard({ item, onClose }) {
  const navigate = useNavigate();
  const isLost = item.status === "lost";
  const statusColor = isLost ? "lostColor" : "foundColor";
  const [timeAgo, setTimeAgo] = useState("");
  const IamTheOwner =
    item.user?.uid === JSON.parse(localStorage.getItem("user")).uid;

  const [year, month, day] = item.dateLost.split("-");

  // Rearrange the components in the "day/month/year" format
  const formattedDate = `${day}/${month}/${year}`;

  useEffect(() => {
    if (item.datePosted) {
      const milliseconds = Math.floor(item.datePosted.nanoseconds / 1000000);
      const date = new Date(item.datePosted.seconds * 1000 + milliseconds); // convert to JavaScript Date object
      setTimeAgo(moment(date).fromNow()); // convert to relative time string
    }
  }, [item.datePosted]);

  const handleChatButton = () => {
    navigate(`/conversation/${item.user?.uid}`);
  };

  // create a reference for your modal
  const ref = useRef(null);

  useEffect(() => {
    // Disable body scroll when the modal opens
    document.body.style.overflow = "hidden";

    // function to check if clicked outside
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Re-enable body scroll when the modal closes
      document.body.style.overflow = "";

      // cleanup the event listener when the component is unmounted
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={ref}
        className="relative mx-auto bg-white rounded-lg overflow-hidden shadow-md w-4/5 h-4/5 flex sm:flex-row flex-col overflow-y-auto" // enable scrolling inside the modal
      >
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
          <div className="absolute top-8 right-1 shadow-2xl shadow-white bg-white bg-opacity-60 p-1">
            <p>on: {formattedDate}</p>
          </div>
        </div>
        <div className="w-full p-8 sm:w-2/5 md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p> {timeAgo} </p>
              <button
                className="absolute top-0 sm:right-0 hidden sm:block bg-lostColor hover:bg-red-700 text-white text-xl font-bold p-2"
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
            <div className="mb-4 mt-4 shadow-xl border p-4 sm:w-40 md:w-80 lg:w-96 rounded bg-white bg-opacity-50 overflow-auto max-h-60">
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>

          <div className="flex justify-between flex-row-reverse items-center text-sm">
            <div className=" opacity-50">
              <span className="font-semibold ">{item.user?.displayName}</span>
              <span className="font-semibold">{IamTheOwner && " (You)"}</span>
            </div>
            <div>
              {!IamTheOwner && (
                <button
                  className={`${
                    isLost ? "bg-lostColor" : "bg-foundColor"
                  }  text-white font-bold py-2 px-4 rounded w-1/2 min-w-[100px] self-center hover:bg-opacity-80`}
                  onClick={handleChatButton}
                >
                  Chat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailCard;
