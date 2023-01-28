import { useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { Board } from "./components/Board";
import { MenuBar } from "./components/MenuBar";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [tempRoom, setTempRoom] = useState(null);

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
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }

  return (
    <>
    <MenuBar setIsAuth={setIsAuth} />
    <div>
      {room ? (
        <Board room={room} />
      ) : (
        <div>
          <label>Choose room:</label>
          <br />
          <form>
            {checkedList.map(({ id, name, checked }) => (
              <div key={id}>
                <input
                  type="radio"
                  name="rooms"
                  value={name}
                  checked={checked}
                  onChange={(e) => {
                    selectRoom(id, e.target.checked);
                    setTempRoom(e.target.value);
                  }}
                />{" "}
                {name}
              </div>
            ))}
            <button
              onClick={(e) => {
                setRoom(tempRoom);
              }}
              disabled={tempRoom==null}
            >
              Let's play!
            </button>
          </form>

          <br />
        </div>
      )}
    </div>
    </>
  );
}

export default App;
