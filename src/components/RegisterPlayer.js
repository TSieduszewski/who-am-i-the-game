import { useState, useCallback } from "react"
import { addDoc, updateDoc, collection, doc } from 'firebase/firestore'
import { db } from "../configs/firebase-config"
import Cookies from "universal-cookie";
import { useEffect } from "react";

export const RegisterPlayer = (props) => {

    const { playersId, setPlayerRegistered, room  } = props
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
               choosenCharacter: character
             });
        } else {
            await updateDoc(doc(users, doc.id), {
                choosenCharacter: character
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