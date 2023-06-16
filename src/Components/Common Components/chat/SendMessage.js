import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import moment from "moment";
import { imageBaseUrl } from '../../../Url/url';

const SendMessage = ({ state, setState, scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      toast.error("Enter valid message", {
        theme: "colored",
        autoClose: 1000
      });
      return;
    }

    await addDoc(collection(db, "chats"), {
      text: message,
      name: localStorage.getItem("fullName"),
      avatar: localStorage.getItem('profilePic') == " " || localStorage.getItem('profilePic') == null ? " " : `${imageBaseUrl}/public/profile/${localStorage.getItem('profilePic')}`,
      createdAt: new Date(),
      uid: localStorage.getItem("id"),
      chatPostId: state.chatPostId,
      chatBidId: state.chatBidId,
      chatTime: moment().format('LT'),
      chatReadStatus:0,
      chatMenuStatus:1
    });

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

//   let permission = Notification.permission;

// if(permission === "granted"){
//    showNotification();
// } else if(permission === "default"){
//    requestAndShowPermission();
// } else {
//   alert("Use normal alert");
// }

// function requestAndShowPermission() {
//     Notification.requestPermission(function (permission) {
//         if (permission === "granted") {
//             showNotification();
//         }
//     });
// }
// function showNotification() {
//   //  if(document.visibilityState === "visible") {
//   //      return;
//   //  }
//    let title = "this is testing notification";
//    let icon = 'https://homepages.cae.wisc.edu/~ece533/images/zelda.png'; //this is a large image may take more time to show notifiction, replace with small size icon
//    let body = "You received a message from Atullsenn";

//    let notification = new Notification(title, { body, icon });

//    notification.onclick = () => {
//           notification.close();
//           window.parent.focus();
//    }
   
// }

  return (
    <form className="send-message">
      <label htmlFor="messageInput" hidden> Enter Message </label>
      <input id="messageInput" name="messageInput" type="text" className="form-input__input" placeholder="type message..." value={message}
        onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage} type="submit">Send</button>
    </form>
  );
};

export default SendMessage;