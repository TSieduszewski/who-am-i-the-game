import { useState, useEffect } from "react";
import { RegisterPlayer } from "./RegisterPlayer";
import { Game } from "./Game";
import Cookies from "universal-cookie";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../configs/firebase-config";
import { useContext } from "react";
import { RoomContext } from "../common/RoomContext";
import { RegisteredPlayerContext } from "../common/RegisteredPlayerContext";

export const Board = () => {
  const cookies = new Cookies();
  const {room } = useContext(RoomContext)
  const {isPlayerRegistered, setPlayerRegistered} = useContext(RegisteredPlayerContext);
  const [playersList, setPlayersList] = useState([]);
  const [playersId, setPlayersId] = useState(null);
  const users = collection(db, "users");

  useEffect(() => {
    const queryUsers = query(users, where("room", "==", room));
    onSnapshot(queryUsers, (snapshot) => {
      let tempUsers = [];
      snapshot.forEach((doc) => {
        if (doc.get("playerToken") === cookies.get("auth-token")) {
          setPlayersId(doc.id);
          if (doc.get("choosenCharacter") != null) {
            setPlayerRegistered(true);
          }
        }
        tempUsers.push({ ...doc.data(), id: doc.id });
      });
      setPlayersList(tempUsers);
    });
  }, []);

  if (!isPlayerRegistered) {
    return (
      <RegisterPlayer
        playersId={playersId}
      />
    );
  } else {
    return <Game playersList={playersList} />;
  }
};
