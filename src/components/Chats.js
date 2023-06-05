import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import ConversationPage from "../pages/ConversationPage";
import { BsChatSquareDots } from "react-icons/bs"; // Import the icon you want

function Chats() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const q1 = query(
      collection(db, "usersChats"),
      where("user1Id", "==", currentUser.uid)
    );

    const q2 = query(
      collection(db, "usersChats"),
      where("user2Id", "==", currentUser.uid)
    );

    const fetchChats = async (query, otherUserIdField) => {
      const querySnapshot = await getDocs(query);
      const fetchPromises = querySnapshot.docs.map(async (document) => {
        const otherUserId = document.data()[otherUserIdField];
        const userDocRef = doc(db, "users", otherUserId);
        const userDocSnap = await getDoc(userDocRef);
        return userDocSnap.data();
      });
      const chatsData = await Promise.all(fetchPromises);
      setChats((chats) => [...chats, ...chatsData]);
    };

    fetchChats(q1, "user2Id");
    fetchChats(q2, "user1Id");
  }, []);

  return (
    <div className="mx-auto my-8 px-4 sm:px-6 lg:px-8 grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Chats</h1>
        <h2 className="mb-4 text-lg">
          Here you can see all the chats you have had with other users.
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {chats.map((chat, index) => (
            <div
              key={index}
              onClick={() => setSelectedChat(chat.uid)}
              className="p-4 bg-white shadow-lg rounded-md cursor-pointer hover:bg-gray-50 transition duration-200"
            >
              <h3 className="font-semibold text-lg">
                Chat with {chat.displayName || "Anonymous"}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg">
        {selectedChat ? (
          <ConversationPage itemOwnerId={selectedChat} />
        ) : (
          <div className="text-center">
            <BsChatSquareDots size={100} className="mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Select a chat to view the conversation.
            </h2>
            <p>You can see your conversations with other users here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
