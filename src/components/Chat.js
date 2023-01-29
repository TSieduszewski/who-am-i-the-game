import { useState, useEffect, useContext } from "react";
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

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const allMessages = collection(db, "messages");
  const { room } = useContext(RoomContext);

  useEffect(() => {
    const queryAllMessages = query(
      allMessages,
      where("room", "==", room),
      orderBy("createdAt"),
      limitToLast(25)
    );
    const unsubscribe = onSnapshot(queryAllMessages, (snapshot) => {
      let tempMessages = [];
      snapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(tempMessages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(allMessages, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setNewMessage("");
  };

  return (
    <>
      <div>Chat area</div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <span>{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Ask
        </button>
      </form>
      <LeaveRoom />
    </>
  );
};
