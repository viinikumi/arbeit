
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../tyyli.css";

function UserInfo() {
  const [user, loading, error] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out: " + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <button className="log" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <p className="log">log in</p>
          <div className="jemma"></div>
        </>
      )}
    </div>
  );
}

export default UserInfo;
