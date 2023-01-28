import Cookies from "universal-cookie";
import { InputTheAnswer } from "./InputTheAnswer";

export const Game = (props) => {
  const { playersList, choosenRoom } = props;
  const cookies = new Cookies();

  return (
    <div>
      <label>Players in the room:</label>
      <br />
      {playersList.map(({ id, playerName, playerToken, choosenCharacter, isGuessed, room, whoGuessed }) => (
        <div key={id}>
            <span>{playerName}</span>
            <span>{isGuessed || (playerToken === cookies.get("auth-token") && choosenRoom === room) ? choosenCharacter : "*****"}</span>
            {(!isGuessed && playerToken !== cookies.get("auth-token") && choosenRoom === room) ?
            (<InputTheAnswer id={id} choosenCharacter={choosenCharacter} />)
             :
             (
                <>
                {(playerToken === cookies.get("auth-token") && choosenRoom === room) ? 
                (<span>This is your character</span>) : (<span>Guessed by {whoGuessed}!</span>)
                }
                </>
             )
            }

        </div>
      ))}
      <br />
    </div>
  );
};
