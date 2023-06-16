import React, { useRef, useEffect } from "react";
// import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { imageBaseUrl } from "../../../Url/url";

const Message = ({ message }) => {
  // const [user] = useAuthState(auth);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [message]);

  const dateee = new Date().toDateString()

  // a (not very efficient) oneliner
let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

 
  const deee = ()=>{
  if(message.createdAt.toDate().toDateString() === dateee){
    return "Today"
  }
  else{
   return message.createdAt.toDate().toDateString()
  }
}



  return (
    <>
    <p style={{color:"black", display:"flex", justifyContent:"center", fontSize:"10px"}}>{deee()}</p>
    <div className={`chat-bubble ${message.uid == localStorage.getItem('id') ? "right" : ""}`} >
      <img className="chat-bubble__left" src={message.avatar ? message.avatar : `${imageBaseUrl}/public/profile/${localStorage.getItem('profilePic')}`}
        alt="user avatar" />
      <div className="chat-bubble__right">
        {/* <p className="user-name">{localStorage.getItem("fullName")}</p> */}
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
      
      <div ref={messagesEndRef} />
    </div>
    {message.uid == localStorage.getItem('id') ?
    <div style={{ display: "flex", justifyContent: "flex-end"}}>
    <p style={{ color: "black", fontSize: "13px", marginTop:"-21px"}}>{message.chatTime}</p>
  </div>:<div style={{ display: "flex", justifyContent: "flex-start"}}>
    <p style={{ color: "black", fontSize: "13px", marginTop:"-21px"}}>{message.chatTime}</p>
  </div>
}
  </>
  );
};

export default Message;