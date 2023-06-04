import React from "react";
import ConversationPage from "../pages/ConversationPage";

function Chats() {
  // list the users I have chatted with and when I click on them, I can see the chat history with ConversationPage Component.
  // get the chats from the talkjs api
  // display the user name, user image, and the last message sent
  // get the itemOwner id (item's user id) and redirect the user conversation/:itemOwnerId onClick

  let uid;
  const getChats = () => {};

  return (
    <div>
      <h1>Chats</h1>
      <div>
        <h2>Chat with user 1 </h2>
        <h2>Chat with user 2</h2>
        <h2>Chat with user 3</h2>
      </div>
    </div>
  );
}

export default Chats;
