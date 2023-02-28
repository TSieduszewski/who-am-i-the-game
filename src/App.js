import { useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { Board } from "./components/Board";
import { MenuBar } from "./components/MenuBar";
import Cookies from "universal-cookie";
import { RoomContext } from "./common/RoomContext";
import { RegisteredPlayerContext } from "./common/RegisteredPlayerContext";

function App() {
  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [tempRoom, setTempRoom] = useState(null);
  const [isPlayerRegistered, setPlayerRegistered] = useState(false);

  const rooms = [
    { id: 1, name: "ROOM1" },
    { id: 2, name: "ROOM2" },
    { id: 3, name: "ROOM3" },
  ];

  const [checkedList, setCheckedList] = useState(rooms);

  const selectRoom = (id, checked) => {
    rooms.map((room) => (room.id === id ? { ...room, checked } : room));
    setCheckedList(rooms);
  };

  if (!isAuth) {
    return (
      <div className="logging-screen">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      <MenuBar setIsAuth={setIsAuth} />
      <div>
        {room ? (
          <RegisteredPlayerContext.Provider
            value={{ isPlayerRegistered, setPlayerRegistered }}
          >
            <Board />
          </RegisteredPlayerContext.Provider>
        ) : (
          <div>
            <h2 className="gradient-multiline">
              <span> Choose playroom: </span>
            </h2>
            <form>
              {checkedList.map(({ id, name, checked }) => (
                  <label key={id} className="rad-label">
                  <input
                    type="radio"
                    name="rooms"
                    className="rad-input"
                    value={name}
                    checked={checked}
                    onChange={(e) => {
                      selectRoom(id, e.target.checked);
                      setTempRoom(e.target.value);
                    }}
                  />
                  <div className="rad-design"></div>
                  <div className="rad-text">{name}</div>
                </label>
              ))}
              <button
              className="btn-hover"
                onClick={(e) => {
                  setRoom(tempRoom);
                  setTempRoom(null)
                }}
                disabled={tempRoom == null}
              >
                Let's play!
              </button>
            </form>

            <br />
          </div>
        )}
      </div>
    </RoomContext.Provider>
  );
}

export default App;
