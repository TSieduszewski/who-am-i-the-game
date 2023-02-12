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
      <h2 className="gradient-multiline">
        <span>Players in the room:</span>
      </h2>
      <div className="rounded-div">
      <div className="thecontainer">
        <span className="rad-text">Player</span>
        <span className="rad-text">Chosen character</span>
        <span className="rad-text">Status</span>
      </div>
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
            <div className="thecontainer" key={id}>
              <span className={`rad-text player ${((playerToken === cookies.get('auth-token') && theRoom === room) || isGuessed) ? ' guessed' : ''}`}>{playerName}</span>
              
                {isGuessed ||
                (playerToken === cookies.get("auth-token") && theRoom === room)
                  ? <span className="rad-text player guessed">{choosenCharacter}</span>
                  : <span className="rad-text player">*****</span>}
              
              {!isGuessed &&
              playerToken !== cookies.get("auth-token") &&
              theRoom === room ? (
                <InputTheAnswer id={id} choosenCharacter={choosenCharacter} />
              ) : (
                <span>
                  {playerToken === cookies.get("auth-token") &&
                  theRoom === room ? (
                    <span className="rad-text player guessed">This is your character</span>
                  ) : (
                    <span className="rad-text player guessed">Guessed by {whoGuessed}!</span>
                  )}
                </span>
              )}
            </div>
          
        )
      )}
      </div>
      <Chat />
    </div>
  );
};
