import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = ({ state, setState }) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const myCollection = collection(db, "chats");

  useEffect(() => {
    const q = query(
      myCollection,
      orderBy('createdAt'),
      // limit('500')
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        if (doc.data().chatPostId === state.chatPostId) { messages.push({ ...doc.data(), id: doc.id }); }
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, []);




  

  return (
    <main className="chat-box">
    
      <div ref={scroll} className="messages-wrapper" style={{ maxHeight: '320px', minHeight: "300px", overflow: "auto" }}>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls dowwn to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage state={state} setState={setState} scroll={scroll} />
    </main>
  );
};

export default ChatBox;