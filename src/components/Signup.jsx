import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../tyyli.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect or perform some action after successful signup
      console.log("Signup successful");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ marginTop: "55px" }}>
      <form
        onSubmit={handleSignup}
        className="logForm"
        style={{ marginTop: "95px" }}
      >
        <div>
          <label>Email:</label>
          <input
            className="logInputMail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="logInputPw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="logBut">
          uusi
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
