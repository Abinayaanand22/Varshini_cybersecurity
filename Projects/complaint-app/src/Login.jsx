import { useState } from "react";

function Login({ role, goToRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setPopup({ show: true, message: "No account found ❌" });
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      onLogin(storedUser.username);
    } else {
      setPopup({ show: true, message: "Email or Password incorrect ❌" });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>User Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        {/* 🔥 REQUIRED TEXT */}
        <p style={styles.text}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={goToRegister}>
            Create Account
          </span>
        </p>
      </div>

      {/* 🔥 APP POPUP */}
      {popup.show && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <p>{popup.message}</p>
            <button onClick={() => setPopup({ show: false, message: "" })}>
              OK
            </button>
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
  text: {
    marginTop: "15px"
  },
  link: {
    color: "blue",
    cursor: "pointer"
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

export default Login;