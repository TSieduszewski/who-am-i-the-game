import { useState, useEffect, useContext, useRef } from "react";
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
  addDoc,
  limitToLast,
} from "firebase/firestore";
import { db, auth } from "../configs/firebase-config";
import { LeaveRoom } from "./LeaveRoom";
import { RoomContext } from "../common/RoomContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const allMessages = collection(db, "messages");
  const { room } = useContext(RoomContext);
  const moveToBottom = useRef(null);

  useEffect(()=>{
    moveToBottom.current?.scrollIntoView({behavior: 'auto'})
  },[allMessages])

  useEffect(() => {
    const queryAllMessages = query(
      allMessages,
      where("room", "==", room),
      orderBy("createdAt"),
      limitToLast(25),
    );
    const unsubscribe = onSnapshot(queryAllMessages, (snapshot) => {
      let tempMessages = [];
      snapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(tempMessages);
    });
    return () => unsubscribe();
  },[]);

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    if (newMessage === "") return;
    await addDoc(allMessages, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
      playerToken: cookies.get("auth-token")
    });

    setNewMessage("");
  };

  return (
    <>
      <h2 className="gradient-multiline">
        <span>Chat area</span>
      </h2>
      <div className="rounded-div">
        <div className="chatsize">
          {messages.map((message) => (
            <><div key={message.id}>
              <span className="rad-text chatplayer">{message.user}:</span>
              <span className="rad-text">{message.text}</span>
            </div><div ref={moveToBottom}></div></>
          ))}
        </div>
      </div>
      <div className="container">
      <div className="container__item">
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="form__field answer"
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button btn btn--primary btn--inside uppercase">
          Ask
        </button>
      </form>
      </div>
      </div>
      <LeaveRoom />
    </>
  );
};
