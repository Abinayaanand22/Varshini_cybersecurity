function RoleSelect({ selectRole }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Select Role</h2>

        <button style={styles.button} onClick={() => selectRole("user")}>
          Login as User
        </button>

        <button style={styles.button} onClick={() => selectRole("admin")}>
          Login as Admin
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
  },
  button: {
    display: "block",
    width: "200px",
    margin: "10px auto",
    padding: "10px",
    background: "#0072ff",
    color: "white",
    border: "none",
  },
};

export default RoleSelect;