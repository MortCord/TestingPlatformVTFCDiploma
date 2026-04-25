import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Error loading users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async () => {
    try {
      await API.post("/users", {
        email,
        password,
        role,
      });

      setEmail("");
      setPassword("");
      loadUsers();
    } catch (err) {
      alert("Error creating user");
    }
  };

  return (
    <div>
    <Navbar />
      <h2>Admin Panel</h2>

      <h3>Create User</h3>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="STUDENT">STUDENT</option>
        <option value="TEACHER">TEACHER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button onClick={createUser}>Create</button>

      <h3>All Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}