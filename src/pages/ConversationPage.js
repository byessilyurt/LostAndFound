import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import Talk from "talkjs";
import { addChatsToFirestore } from "../firebase/utils";

function ConversationPage({ itemOwnerId }) {
  const chatContainerRef = useRef(null);
  const params = useParams();
  if (!itemOwnerId) {
    itemOwnerId = params.itemOwnerId;
  }
  const [otherUser, setOtherUser] = useState({});
  const { defaultImage } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function createChat() {
      try {
        // get current user from local storage
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const userDocRef = doc(db, "users", itemOwnerId); // Reference to a document with ID of user's uid
        const userDocSnap = await getDoc(userDocRef);
        const otherUserDoc = userDocSnap.data();
        setOtherUser(otherUserDoc);

        const me = new Talk.User({
          id: currentUser.uid,
          name: currentUser.displayName || "Anonymous",
          email: currentUser.email,
          photoUrl: currentUser.photoURL || defaultImage,
          welcomeMessage: "Hello!",
          role: "default",
        });

        const other = new Talk.User({
          id: otherUserDoc.uid,
          name: otherUserDoc.displayName || "Anonymous",
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
        console.log(me);
        console.log(other);
        const conversationId = `${itemOwnerId}-${Talk.oneOnOneId(me, other)}`;
        const conversation =
          window.talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(me);
        conversation.setParticipant(other);
        let chatbox = null;
        setTimeout(() => {
          chatbox = window.talkSession.createChatbox(conversation);
          chatbox.mount(chatContainerRef.current);
          addChatsToFirestore(conversationId, me.id, other.id);
        }, 2000); // Adds a delay of 2 seconds (2000 milliseconds)

        return () => {
          chatbox && chatbox.destroy();
        };
      } catch (error) {
        console.error("Failed to create or fetch chat", error);
      }
    }

    createChat();
  }, [itemOwnerId]);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={chatContainerRef}
        className="h-[600px] w-[280px] sm:w-[500px] md:w-[600px] lg:w-[700px] mx-auto"
      ></div>
    </div>
  );
}

export default ConversationPage;
