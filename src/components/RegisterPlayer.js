import { useState } from "react"
import { addDoc, updateDoc, collection, doc } from 'firebase/firestore'
import { db } from "../configs/firebase-config"
import Cookies from "universal-cookie";
import { useContext } from "react";
import { RoomContext } from "../common/RoomContext";
import { RegisteredPlayerContext } from "../common/RegisteredPlayerContext";

export const RegisterPlayer = (props) => {

    const { playersId } = props
    const {setPlayerRegistered} = useContext(RegisteredPlayerContext);
    const {room } = useContext(RoomContext)
    const [ character, setCharacter ] = useState("")
    const users = collection(db, "users")
    const cookies = new Cookies();

    const handleChoice = async (e) => {
        e.preventDefault()
        if(character === "") {
            return
        }
        if (playersId == null) {   
            await addDoc(users, {
               playerName: cookies.get("auth-name"),
               playerToken: cookies.get("auth-token"),
               room: room,
               choosenCharacter: character,
               isGuessed : false,
               whoGuessed : null
             });
        } else {
            await updateDoc(doc(users, playersId), {
                choosenCharacter: character,
                isGuessed : false,
                whoGuessed : ""
              })
        }
        setCharacter("")
        setPlayerRegistered(true)
    }
    return (
        <>
            <div>Choose your character to guess:</div>
            <form onSubmit={ handleChoice }>
                <input placeholder="My character to guess is..." onChange={(e) => {setCharacter(e.target.value)}} value={character}/>
                <button type="submit">Choose</button>
            </form>
        </>

    )
}