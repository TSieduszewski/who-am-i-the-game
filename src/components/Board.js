import { useState } from "react";
import { RegisterPlayer } from "./RegisterPlayer";
import { Game } from "./Game";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../configs/firebase-config";

export const Board = (props) => {
  const cookies = new Cookies();
  const { room } = props;
  const [isPlayerRegistered, setPlayerRegistered] = useState(false);
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
        }
        if (doc.get("choosenCharacter") != null) {
          setPlayerRegistered(true);
        } else {
          setPlayerRegistered(false);
        }
        tempUsers.push({ ...doc.data(), id: doc.id });
      });
      setPlayersList(tempUsers);
    });
  }, []);

  //zacznij grę
  if (!isPlayerRegistered) {
    return (
      <RegisterPlayer
        playersId={playersId}
        room={room}
        setPlayerRegistered={setPlayerRegistered}
      />
    );
  } else {
    return <Game playersList={playersList} />;
  }
};
