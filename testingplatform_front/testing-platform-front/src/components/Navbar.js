import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    logout();
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Link to="/dashboard">Home</Link>

      {role === "ADMIN" && (
        <Link to="/admin">Admin Panel</Link>
      )}

      {role === "TEACHER" && (
        <Link to="/teacher">Teacher Panel</Link>
      )}

      {role === "STUDENT" && (
        <Link to="/tests">Tests</Link>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}