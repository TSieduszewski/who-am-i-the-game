import { useState } from "react"
import { updateDoc, collection, doc } from 'firebase/firestore'
import { db } from "../configs/firebase-config"
import Cookies from "universal-cookie";

export const InputTheAnswer = (props) => {
    const cookies = new Cookies();
    const { id, choosenCharacter } = props
    const [ answer, setAnswer ] = useState("")
    const [ placeholder, setPlaceholder] = useState("My guess is...")
    const users = collection(db, "users")

    const handlePlaceholder = () => {
        setPlaceholder("Wrong! Try again.")
        setTimeout(() => {setPlaceholder("My guess is...")}, 1500)
    }

    const handleAnswer = async (e) => {
        e.preventDefault()
        if(answer.toLowerCase().replace(/\s/g, "") !== choosenCharacter.toLowerCase().replace(/\s/g, "")) {
            setAnswer("")
            handlePlaceholder()
            return
        }

            await updateDoc(doc(users, id), {
                isGuessed : true,
                whoGuessed : cookies.get("auth-name")
              })
              setAnswer("")
    }

return (
    <span>
                <form onSubmit={ handleAnswer }>
                    <input placeholder={placeholder} onChange={(e) => {setAnswer(e.target.value)}} value={answer}></input>
                    <button type="submit">Try!</button>
                </form>
             </span>
)

}