import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../pages/styles/Navbar.scss";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/tests?search=${search}`);
    }
  };

  const isAdmin = role === "ADMIN";
  const isTeacher = role === "TEACHER";
  const isStudent = role === "STUDENT" || role === "TEACHER" || role === "ADMIN";

  return (
    <div className="navbar-ui">
      <div className="nav-left">
        <Link className="nav-link" to="/dashboard">Головна</Link>

        {isAdmin && <Link className="nav-link" to="/admin">Панель адміна</Link>}
        {isTeacher && <Link className="nav-link" to="/teacher">Панель вчителя</Link>}
        {isStudent && <Link className="nav-link" to="/tests">Тести</Link>}
        {isStudent && <Link className="nav-link" to="/join-test">Приєднатися до тесту за кодом</Link>}
      </div>

      <div className="nav-search">
        <input
          className="nav-input"
          placeholder="Пошук тестів..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-ui btn-primary" onClick={handleSearch}>
          Пошук
        </button>
      </div>

      <button className="btn-ui btn-danger" onClick={handleLogout}>
        Вийти
      </button>
    </div>
  );
}