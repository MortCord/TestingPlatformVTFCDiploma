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
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}