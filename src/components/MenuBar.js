import Cookies from "universal-cookie";
import {
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../configs/firebase-config";

const cookies = new Cookies();

export const MenuBar = (props) => {
  const { setIsAuth } = props;
  const displayName = cookies.get("auth-name");

  const signOutUser = async () => {
    const user = collection(db, "users");
    const queryUser = query(
      user,
      where("playerToken", "==", cookies.get("auth-token"))
    );

    const snapshot = await getDocs(queryUser);
    console.log(snapshot.size)
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    setIsAuth(false);

    const messages = collection(db, "messages")
    const queryMessages = query(
      messages,
      where("playerToken", "==", cookies.get("auth-token"))
    );
    const messageSnapshot = await getDocs(queryMessages);
    console.log(messageSnapshot.size)
    messageSnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    cookies.remove("auth-name");
    cookies.remove("auth-token");
    window.location.reload(true);
  };

  return (
    <div className="menu">
      <div>Welcome <span className="loggedUser">{displayName}</span></div>
      <button className="square_btn" onClick={signOutUser}>SIGN OUT</button>
    </div>
  );
};
