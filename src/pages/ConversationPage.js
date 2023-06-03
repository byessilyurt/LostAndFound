import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Talk from "talkjs";

function ConversationPage() {
  const chatContainerRef = useRef(null);
  const { itemOwnerId } = useParams();

  useEffect(() => {
    async function createChat() {
      const auth = getAuth();
      //const user = auth.currentUser;

      const db = getFirestore();

      const currentUserDocRef = doc(db, 'users', "DhaDdW4CYNpQbHi2ikwK");
      const currentUserDocSnap = await getDoc(currentUserDocRef);

      const otherUserDocRef = doc(db, 'users', "qUu7QklAljzt8Tu78jJN");
      const otherUserDocSnap = await getDoc(otherUserDocRef);

      const me = new Talk.User({
        id: currentUserDocSnap.id,
        name: currentUserDocSnap.data().name,
        email: currentUserDocSnap.data().email,
        //photoUrl: currentUserDocSnap.data().photoURL,
        welcomeMessage: "Hello!",
        role: "default",
      });

      const other = new Talk.User({
        id: otherUserDocSnap.id,
        name: otherUserDocSnap.data().name,
        email: otherUserDocSnap.data().email,
        //photoUrl: otherUserDocSnap.data().photoURL,
        welcomeMessage: "Hello!",
        role: "default",
      });

      if (!window.talkSession) {
        window.talkSession = new Talk.Session({
          appId: "tP6Jndfs",
          me,
        });
      }

      const conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
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
      <div ref={chatContainerRef} style={{ height: "800px", width: "500px" }}></div>
    </div>
  );
}

export default ConversationPage;
