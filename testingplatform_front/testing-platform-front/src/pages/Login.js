import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const parseJwt = (token) => {
  if (!token) return null;
  return JSON.parse(atob(token.split(".")[1]));
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const token = res.data;

      login(token);

      const payload = parseJwt(token);
      const role = payload.role;

      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/admin");
      else if (role === "TEACHER") navigate("/teacher");
      else navigate("/tests");
    } catch (err) {
      alert("Неправильна пошта або пароль");
    }
  };

  return (
    <div
      className="container-ui"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card-ui" style={{ width: 360 }}>

        <h2 style={{ marginBottom: 5 }}>З поверненням</h2>

        <p style={{ marginBottom: 15, color: "#6b7280" }}>
          Увійдіть у свій обліковий запис
        </p>

        <input
          className="input-ui"
          placeholder="Електронна пошта"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-ui"
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn-ui btn-primary"
          style={{ width: "100%" }}
          onClick={handleLogin}
        >
          Увійти
        </button>

      </div>
    </div>
  );
}