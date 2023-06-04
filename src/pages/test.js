import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import Talk from "talkjs";

function ConversationPage() {
  const chatContainerRef = useRef(null);
  const { itemOwnerId } = useParams();
  const { defaultImage } = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function createChat() {
      // get current user from local storage
      const currentUser = JSON.parse(localStorage.getItem("user"));
      //      const currentUserDocRef = doc(db, "users", "DhaDdW4CYNpQbHi2ikwK");
      //     const currentUserDocSnap = await getDoc(currentUserDocRef);
      const userDocRef = doc(db, "users", itemOwnerId); // Reference to a document with ID of user's uid
      const userDocSnap = await getDoc(userDocRef);
      const otherUserDoc = userDocSnap.data();
      // const otherUserDocRef = doc(db, "users", itemOwnerId);
      // const otherUserDocSnap = await getDoc(otherUserDocRef);

      const me = new Talk.User({
        id: currentUser.uid,
        name: currentUser.displayName || "Anonymous", // TODO: change to accept names from github and sign up form.
        email: currentUser.email,
        photoUrl: currentUser.photoURL || defaultImage,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const other = new Talk.User({
        id: otherUserDoc.uid,
        name: otherUserDoc.name || "Anonymous", // TODO: change to accept names from google, github and sign up form.
        email: otherUserDoc.email || "Anonymous",
        photoUrl: otherUserDoc.photoURL || defaultImage,
        welcomeMessage: "Hello!",
        role: "default",
      });
      if (!window.talkSession) {
        window.talkSession = new Talk.Session({
          appId: "tP6Jndfs",
          me,
        });
      }

      const conversation = window.talkSession.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
      );
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const chatbox = window.talkSession.createChatbox(conversation);
      chatbox.mount(chatContainerRef.current);

      return () => {
        chatbox.destroy();
      };
    }

    createChat();
  }, [itemOwnerId]);

  return (
    <div>
      <h1>Conversation with {itemOwnerId}</h1>
      <div
        ref={chatContainerRef}
        style={{ height: "800px", width: "500px" }}
      ></div>
    </div>
  );
}

export default ConversationPage;

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import Talk from "talkjs";

function Chats() {
  const chatContainerRef = useRef(null);
  const { itemOwnerId } = useParams();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    async function fetchChats() {
      const chatSessionsSnapshot = await getDocs(collection(db, "chatSessions"));
      const chatSessions = chatSessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(chatSessions);
    }

    fetchChats();
  }, [db, itemOwnerId]);

  useEffect(() => {
    if (selectedChat) {
      const createOrFetchConversation = async () => {
        const { user1, user2 } = selectedChat;
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const user1DocRef = doc(db, 'users', user1);
        const user2DocRef = doc(db, 'users', user2);

        const [user1Snapshot, user2Snapshot] = await Promise.all([
          getDoc(user1DocRef),
          getDoc(user2DocRef)
        ]);

        const me = new Talk.User({
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
          welcomeMessage: "Hello there!",
          role: "member"
        });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tP6Jndfs",
            me: me
          });
        }

        const otherUserSnapshot = user1 === currentUser.uid ? user2Snapshot : user1Snapshot;
        const otherUser = otherUserSnapshot.data();

        const other = new Talk.User({
          id: otherUser.uid,
          name: otherUser.displayName,
          email: otherUser.email,
          photoUrl: otherUser.photoURL,
          welcomeMessage: "Hello there!",
          role: "member"
        });

        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const chatbox = window.talkSession.createChatbox(conversation);
        chatbox.mount(chatContainerRef.current);

        return () => {
          chatbox.destroy();
        };
      }

      createOrFetchConversation();
    }
  }, [selectedChat, db]);

  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">My Chats</h1>
      <div className="w-1/3 bg-white overflow-auto" style={{ maxHeight: "80vh" }}>
        {chats.map(chat => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedChat(chat)}
            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
          >
            {chat.user1 === JSON.parse(localStorage.getItem("user")).uid ? chat.user2 : chat.user1}
          </div>
        ))}
      </div>
      <div ref={chatContainerRef} className="flex-grow bg-gray-100 p-4" style={{ height: "80vh" }}></div>
    </div>
  );
}

export default Chats;


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Talk from "talkjs";

function ConversationPage() {
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const { defaultImage } = JSON.parse(localStorage.getItem("user"));

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    async function fetchChats() {
      const chatSessionsSnapshot = await getDocs(collection(db, "chatSessions"));
      const chatSessions = chatSessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setChats(chatSessions);
    }

    fetchChats();
  }, [db]);

  useEffect(() => {
    if (selectedChat) {
      const createOrFetchConversation = async () => {
        const { user1, user2 } = selectedChat;

        const user1DocRef = doc(db, 'users', user1);
        const user2DocRef = doc(db, 'users', user2);

        const [user1Snapshot, user2Snapshot] = await Promise.all([
          getDoc(user1DocRef),
          getDoc(user2DocRef)
        ]);

        const me = new Talk.User({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          welcomeMessage: "Hello there!",
          role: "member"
        });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "YOUR_TALKJS_APP_ID",
            me: me
          });
        }

        const other = new Talk.User({
          id: user2Snapshot.data().uid,
          name: user2Snapshot.data().displayName,
          email: user2Snapshot.data().email,
          photoUrl: user2Snapshot.data().photoURL,
          welcomeMessage: "Hello there!",
          role: "member"
        });

        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const chatbox = window.talkSession.createChatbox(conversation);
        chatbox.mount(chatContainerRef.current);

        return () => {
          chatbox.destroy();
        };
      }

      createOrFetchConversation();
    }
  }, [selectedChat, db, user, navigate]);

  return (
    <div>
      <h1>My Chats</h1>
      <div>
        {chats.map(chat => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedChat(chat)}
            style={{cursor: 'pointer'}}
          >
            {chat.user1 === user.uid ? chat.user2 : chat.user1}
          </div>
        ))}
      </div>
      <div ref={chatContainerRef} style={{ height: "500px" }}></div>
    </div>
  );
}

export default ConversationPage;

