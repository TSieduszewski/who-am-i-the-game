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
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    setIsAuth(false);
    cookies.remove("auth-name");
    cookies.remove("auth-token");
    window.location.reload(true);
  };

  return (
    <>
      <div>Welcome {displayName}</div>
      <button onClick={signOutUser}>SIGN OUT</button>
    </>
  );
};
