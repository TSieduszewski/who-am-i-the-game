import { auth, provider } from "../configs/firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

export const Auth = (props) => {
  const { setIsAuth } = props;
  const cookies = new Cookies();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      cookies.set("auth-name", result.user.displayName);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Welcome to the 'Who am I the game'</h1>
      <p>Sign in with Google</p>
      <button className ="login-with-google-btn" onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
};
