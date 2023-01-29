import { updateDoc, deleteDoc, collection, where, query, doc, getDocs } from 'firebase/firestore'
import { db } from "../configs/firebase-config"
import Cookies from "universal-cookie";
import { useContext } from "react";
import { RoomContext } from "../common/RoomContext";
import { RegisteredPlayerContext } from "../common/RegisteredPlayerContext";

export const LeaveRoom = () => {
    const {room, setRoom } = useContext(RoomContext)
    const {setPlayerRegistered} = useContext(RegisteredPlayerContext);
    const cookies = new Cookies();
    const user = collection(db, "users")
    const queryUser = query(user, where("playerToken", "==", cookies.get("auth-token")), where("room", "==", room));
    
    const leaveAndClean = async (e) => {
        e.preventDefault()
        const snapshot = await getDocs(queryUser)
        snapshot.forEach((doc)=>{
            deleteDoc(doc.ref)
        })
        setRoom(null)
        setPlayerRegistered(false)
    }

    const leaveAndNoClean = () => {
        setRoom(null)
    }

    const noLeaveAndClean = async (e) => {
        e.preventDefault()
        const snapshot = await getDocs(queryUser)
        snapshot.forEach((d)=>{
            updateDoc(doc(user, d.id), {
                whoGuessed : null,
                isGuessed: false,
                choosenCharacter: null
            })
        })
        setPlayerRegistered(false)
    }

    return (
        <span>
            <button onClick={leaveAndNoClean}>Leave room without cleaning the data</button>
            <button onClick={leaveAndClean}>Leave room and clean the data</button>
            <button onClick={noLeaveAndClean}>Clean the data</button>
     </span>
    )
}