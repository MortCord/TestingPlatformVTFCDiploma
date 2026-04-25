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
      else navigate("/tests"); // STUDENT

    } catch (err) {
      alert("Register error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}