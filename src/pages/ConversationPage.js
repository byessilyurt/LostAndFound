import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import Talk from "talkjs";

function ConversationPage() {
  const chatContainerRef = useRef(null);
  const { itemOwnerId } = useParams();
  const defaultUserImage = "https://source.unsplash.com/random";
  useEffect(() => {
    async function createChat() {
      // get current user from local storage
      const currentUser = JSON.parse(localStorage.getItem("user"));
      //      const currentUserDocRef = doc(db, "users", "DhaDdW4CYNpQbHi2ikwK");
      //     const currentUserDocSnap = await getDoc(currentUserDocRef);
      const userDocRef = doc(db, "users", itemOwnerId); // Reference to a document with ID of user's uid
      const userDocSnap = await getDoc(userDocRef);
      const otherUserDoc = userDocSnap.data();
      console.log(otherUserDoc);
      // const otherUserDocRef = doc(db, "users", itemOwnerId);
      // const otherUserDocSnap = await getDoc(otherUserDocRef);

      const me = new Talk.User({
        id: currentUser.uid,
        name: currentUser.displayName || "Anonymous", // TODO: change to accept names from github and sign up form.
        email: currentUser.email,
        photoUrl: currentUser.photoURL || defaultUserImage,
        welcomeMessage: "Hello!",
        role: "default",
      });
      console.log(me);

      const other = new Talk.User({
        id: otherUserDoc.uid,
        name: otherUserDoc.name || "Anonymous", // TODO: change to accept names from google, github and sign up form.
        email: otherUserDoc.email || "Anonymous",
        photoUrl: otherUserDoc.photoURL || defaultUserImage,
        welcomeMessage: "Hello!",
        role: "default",
      });
      console.log("other: ", other);

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
