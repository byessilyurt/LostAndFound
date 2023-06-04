import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Talk from "talkjs";

function Chats() {
  const chatContainerRef = useRef(null);
  const { itemOwnerId } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    async function fetchChats() {
      const chatSessionsSnapshot = await getDocs(collection(db, "chatSessions"));
      const chatSessions = chatSessionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatSessions);
    }

    fetchChats();
  }, [db]);

  useEffect(() => {
    if (selectedChat) {
      const createOrFetchConversation = async () => {
        const { user1, user2 } = selectedChat;

        const user1DocRef = doc(db, "users", user1);
        const user2DocRef = doc(db, "users", user2);

        const [user1Snapshot, user2Snapshot] = await Promise.all([
          getDoc(user1DocRef),
          getDoc(user2DocRef),
        ]);

        const me = new Talk.User({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          welcomeMessage: "Hello there!",
          role: "member",
        });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tP6Jndfs",
            me: me,
          });
        }

        const other = new Talk.User({
          id: user2Snapshot.data().uid,
          name: user2Snapshot.data().displayName,
          email: user2Snapshot.data().email,
          photoUrl: user2Snapshot.data().photoURL,
          welcomeMessage: "Hello there!",
          role: "member",
        });

        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(
          conversationId
        );
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const chatbox = window.talkSession.createChatbox(conversation);
        chatbox.mount(chatContainerRef.current);

        return () => {
          chatbox.destroy();
        };
      };

      createOrFetchConversation();
    }
  }, [selectedChat, db, user]);

  useEffect(() => {
    if (itemOwnerId) {
      const startConversationWithItemOwner = async () => {
        const userDocRef = doc(db, "users", itemOwnerId);
        const userDocSnap = await getDoc(userDocRef);
        const otherUserDoc = userDocSnap.data();

        const me = new Talk.User({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          welcomeMessage: "Hello!",
          role: "default",
        });

        const other = new Talk.User({
          id: otherUserDoc.uid,
          name: otherUserDoc.displayName,
          email: otherUserDoc.email,
          photoUrl: otherUserDoc.photoURL,
          welcomeMessage: "Hello!",
          role: "default",
        });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tP6Jndfs",
            me: me,
          });
        }

        const conversation = window.talkSession.getOrCreateConversation(
          Talk.oneOnOneId(me, other)
        );
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const chatbox = window.talkSession.createChatbox(conversation);
        chatbox.mount(chatContainerRef.current);

        setSelectedChat({ user1: me.id, user2: other.id });
      };

      startConversationWithItemOwner();
    }
  }, [itemOwnerId, db, user]);

  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">My Chats</h1>
      <div className="w-1/3 bg-white overflow-auto" style={{ maxHeight: "80vh" }}>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
          >
            {chat.user1 === user.uid ? chat.user2 : chat.user1}
          </div>
        ))}
      </div>
      <div
        ref={chatContainerRef}
        className="flex-grow bg-gray-100 p-4"
        style={{ height: "80vh" }}
      ></div>
    </div>
  );
}

export default Chats;
