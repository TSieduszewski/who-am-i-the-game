import Cookies from "universal-cookie";
import { InputTheAnswer } from "./InputTheAnswer";
import { Chat } from "./Chat";
import { useContext } from "react";
import { RoomContext } from "../common/RoomContext";

export const Game = (props) => {
  const { playersList } = props;
  const cookies = new Cookies();
  const { room } = useContext(RoomContext);
  const theRoom = room;
  return (
    <div>
      <label>Players in the room:</label>
      <br />
      {playersList.map(
        ({
          id,
          playerName,
          playerToken,
          choosenCharacter,
          isGuessed,
          room,
          whoGuessed,
        }) => (
          <div key={id}>
            <span>{playerName}</span>
            <span>
              {isGuessed ||
              (playerToken === cookies.get("auth-token") && theRoom === room)
                ? choosenCharacter
                : "*****"}
            </span>
            {!isGuessed &&
            playerToken !== cookies.get("auth-token") &&
            theRoom === room ? (
              <InputTheAnswer id={id} choosenCharacter={choosenCharacter} />
            ) : (
              <>
                {playerToken === cookies.get("auth-token") &&
                theRoom === room ? (
                  <span>This is your character</span>
                ) : (
                  <span>Guessed by {whoGuessed}!</span>
                )}
              </>
            )}
          </div>
        )
      )}
      <br />
      <Chat />
    </div>
  );
};
