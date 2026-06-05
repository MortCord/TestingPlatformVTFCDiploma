import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  if (!token) return null;
  return JSON.parse(atob(token.split(".")[1]));
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        email,
        password,
      });

      const token = res.data;

      localStorage.setItem("token", token);

      const payload = parseJwt(token);
      const role = payload.role;

      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/admin");
      else if (role === "TEACHER") navigate("/teacher");
      else navigate("/tests");
    } catch (err) {
      alert("Помилка");
    }
  };

  return (
    <div className="container-ui" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>

      <div className="card-ui" style={{ width: 360 }}>

        <h2 style={{ marginBottom: 5 }}>Створити обліковий запис</h2>
        <p style={{ marginBottom: 15, color: "#6b7280" }}>
          Приєднатися до Testikify
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
          onClick={handleRegister}
        >
          Стоврити обліковий запис
        </button>

      </div>

    </div>
  );
}