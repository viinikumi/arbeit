import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../tyyli.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login onnistui");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="logForm">
        <div>
          <label></label>
          <input
            placeholder="s-posti"
            style={{ textAlign: "center" }}
            className="logInputMail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label></label>
          <input
            placeholder="salasana"
            style={{ textAlign: "center" }}
            className="logInputPw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="logBut">
          Kirjaudu
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
