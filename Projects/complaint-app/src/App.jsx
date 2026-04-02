import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("role");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      {/* ROLE SELECT */}
      {page === "role" && (
        <div style={styles.container}>
          <div style={styles.card}>
            <h2>Select Role</h2>

            <button onClick={() => {setRole("admin"); setPage("login");}} style={styles.button}>
              Admin
            </button>

            <button onClick={() => {setRole("user"); setPage("login");}} style={styles.button}>
              User
            </button>
          </div>
        </div>
      )}

      {/* LOGIN */}
      {page === "login" && (
        <Login
          role={role}
          goToRegister={() => setPage("register")}   // 🔥 FIXED
          onLogin={(name) => {
            setUsername(name);
            setPage("dashboard");
          }}
        />
      )}

      {/* REGISTER */}
      {page === "register" && (
        <Register
          goToLogin={() => setPage("login")}   // 🔥 FIXED
        />
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <Dashboard username={username} role={role} />
      )}
    </>
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
    textAlign: "center"
  },
  button: {
    display: "block",
    width: "200px",
    margin: "10px auto",
    padding: "12px",
    background: "#0072ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default App;