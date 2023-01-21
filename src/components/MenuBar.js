import Cookies from "universal-cookie";
const cookies = new Cookies();

export const MenuBar = (props) => {

    const { setIsAuth } = props
    const displayName = cookies.get("auth-name")

    function signOutUser() {
        setIsAuth(false)
        cookies.remove("auth-name")
        cookies.remove("auth-token")
        window.location.reload(true)
        
    }

    return (
        <>
        <div>Welcome {displayName}</div>
        <button onClick={signOutUser}>SIGN OUT</button>
        </>
    )
}