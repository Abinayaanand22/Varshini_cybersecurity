import { useState, useEffect } from "react";

function Dashboard({ username, role }) {

  const [page, setPage] = useState("home");
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem("complaints");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [popup, setPopup] = useState(false);

  // ✅ BACK FEATURE (added)
  const [history, setHistory] = useState([]);

  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, history.length - 1));
    setPage(prev);
  };

  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const addComplaint = () => {
    if (!text) return;

    const newComplaint = {
      id: Date.now(),
      text,
      status: "Pending"
    };

    setComplaints([...complaints, newComplaint]);
    setText("");
    setPopup(true);

    setTimeout(() => setPopup(false), 2000);
  };

  const updateStatus = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: "Resolved" } : c
    );
    setComplaints(updated);
  };

  return (
    <div style={styles.container}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>{role === "admin" ? "Admin Panel" : "User Panel"}</h2>

        <p style={styles.menu} onClick={() => {
          setHistory([...history, page]);
          setPage("home");
        }}>Dashboard</p>

        {role === "user" && (
          <p style={styles.menu} onClick={() => {
            setHistory([...history, page]);
            setPage("raise");
          }}>Raise Complaint</p>
        )}

        {role === "user" && (
          <p style={styles.menu} onClick={() => {
            setHistory([...history, page]);
            setPage("my");
          }}>My Complaints</p>
        )}

        {role === "admin" && (
          <p style={styles.menu} onClick={() => {
            setHistory([...history, page]);
            setPage("all");
          }}>All Complaints</p>
        )}
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        <div style={styles.navbar}>

          {/* ✅ BACK BUTTON (added only) */}
          {history.length > 0 && (
            <button onClick={goBack} style={styles.backBtn}>←</button>
          )}

          <h2>Welcome, {username} 👋</h2>

          <button style={styles.logoutBtn} onClick={() => setShowLogout(true)}>
            Logout
          </button>
        </div>

        {page === "home" && (
          <div>
            <h3>Dashboard Overview</h3>
            <p>Total Complaints: {complaints.length}</p>
          </div>
        )}

        {page === "raise" && (
          <div>
            <h3>Raise Complaint</h3>
            <textarea
              placeholder="Enter complaint..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={styles.textarea}
            />
            <br />
            <button onClick={addComplaint}>Submit</button>
          </div>
        )}

        {page === "my" && (
          <div>
            <h3>My Complaints</h3>
            {complaints.length === 0 ? (
              <p>No complaints yet</p>
            ) : (
              complaints.map((c) => (
                <div key={c.id} style={styles.card}>
                  <p>{c.text}</p>
                  <p>Status: {c.status}</p>
                </div>
              ))
            )}
          </div>
        )}

        {page === "all" && (
          <div>
            <h3>All Complaints</h3>
            {complaints.map((c) => (
              <div key={c.id} style={styles.card}>
                <p>{c.text}</p>
                <p>Status: {c.status}</p>
                {c.status === "Pending" && (
                  <button onClick={() => updateStatus(c.id)}>
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {popup && (
          <div style={styles.popup}>
            Complaint Submitted Successfully ✅
          </div>
        )}

        {showLogout && (
          <div style={styles.popupBox}>
            <p>Are you sure you want to logout?</p>
            <button onClick={() => window.location.reload()}>OK</button>
            <button onClick={() => setShowLogout(false)}>Cancel</button>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh" },
  sidebar: { width: "200px", background: "#333", color: "#fff", padding: "20px" },
  menu: { cursor: "pointer", margin: "10px 0" },
  main: { flex: 1, padding: "20px" },
  navbar: { display: "flex", alignItems: "center", justifyContent: "space-between" },

  // ✅ ONLY NEW STYLE
  backBtn: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer"
  },

  logoutBtn: { background: "red", color: "#fff", border: "none", padding: "10px" },
  textarea: {
  width: "100%",
  maxWidth: "500px",
  height: "150px",
  padding: "10px",
  fontSize: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none"
},
  card: { border: "1px solid #ccc", padding: "10px", margin: "10px 0" },
  popup: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "green",
    color: "#fff",
    padding: "10px"
  },
 popupBox: {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  textAlign: "center",
  minWidth: "300px"
},
};

export default Dashboard;