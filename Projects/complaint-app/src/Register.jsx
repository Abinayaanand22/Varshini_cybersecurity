import { useState } from "react";

function Register({ goToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState({ show: false, message: "" });

  const handleRegister = () => {
    if (!username || !email || !password) {
      setPopup({ show: true, message: "Fill all fields ❌" });
      return;
    }

    if (!email.includes("@")) {
      setPopup({ show: true, message: "Invalid Email ❌" });
      return;
    }

    // 🔥 STORE SAME DATA
    const user = {
      username,
      email,
      password
    };

    localStorage.setItem("user", JSON.stringify(user));

    setPopup({ show: true, message: "Account Created Successfully ✅" });
  };

  const handleOk = () => {
    if (popup.message.includes("Successfully")) {
      goToLogin(); // ✅ only after OK
    }
    setPopup({ show: false, message: "" });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          Create Account
        </button>
      </div>

      {/* 🔥 POPUP */}
      {popup.show && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <p>{popup.message}</p>
            <button onClick={handleOk}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #00c6ff, #0072ff)"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    width: "360px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0072ff",
    color: "white"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  popup: {
    background: "white",
    padding: "20px",
    borderRadius: "10px"
  }
};

export default Register;