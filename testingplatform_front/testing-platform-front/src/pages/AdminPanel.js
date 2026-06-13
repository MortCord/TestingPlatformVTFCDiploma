import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "./styles/AdminPanel.scss";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");

  const [editingUser, setEditingUser] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("STUDENT");

  const loadUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const loadTests = async () => {
    const res = await API.get("/tests");
    setTests(res.data);
  };

  useEffect(() => {
    loadUsers();
    loadTests();
  }, []);

  const createUser = async () => {
    await API.post("/users", { email, password, role });
    setEmail("");
    setPassword("");
    loadUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    loadUsers();
  };

  const startEdit = (u) => {
    setEditingUser(u);
    setEditEmail(u.email);
    setEditRole(u.role);
  };

  const saveEdit = async () => {
    await API.put(`/users/${editingUser.id}`, {
      email: editEmail,
      role: editRole,
    });

    setEditingUser(null);
    loadUsers();
  };

  const deleteTest = async (id) => {
    await API.delete(`/tests/${id}`);
    loadTests();
  };

  return (
    <div>
      <Navbar />

      <div className="container-ui">

        <h1>Панель адміна</h1>

        <div className="card-ui">
          <h3>Створити обліковий запис</h3>

          <input
            className="input-ui"
            placeholder="Електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input-ui"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="select-ui"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Студент</option>
            <option value="TEACHER">Вчитель</option>
            <option value="ADMIN">Адмін</option>
          </select>

          <button className="btn-ui btn-primary" onClick={createUser}>
            Створити
          </button>
        </div>

        <h2>Користувачі</h2>

        <div className="grid-ui">
          {users.map((u) => (
            <div className="card-ui" key={u.id}>
              <h3>{u.email}</h3>
              <p>{u.role}</p>

              <button className="btn-ui btn-gray" onClick={() => startEdit(u)}>
                Редагувати
              </button>
<br/>
<br/>
              <button
                className="btn-ui btn-danger"
                onClick={() => deleteUser(u.id)}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>

        <h2>Тести</h2>

        <div className="grid-ui">
          {tests.map((t) => (
            <div className="card-ui" key={t.id}>
              <h3>{t.title}</h3>
              <p>Автор: <b>{t.createdBy?.email || "Не відомо"}</b></p>

              <button
                className="btn-ui btn-danger"
                onClick={() => deleteTest(t.id)}
              >
                Видалити тест
              </button>
            </div>
          ))}
        </div>

        {editingUser && (
          <div className="modal-overlay">
            <div className="card-ui">
              <h3>Редагувати користувача</h3>

              <input
                className="input-ui"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />

              <select
                className="select-ui"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
              >
                <option value="STUDENT">Студент</option>
                <option value="TEACHER">Вчитель</option>
                <option value="ADMIN">Адмін</option>
              </select>

              <button className="btn-ui btn-primary" onClick={saveEdit}>
                Зберегти
              </button>

              <button
                className="btn-ui btn-gray"
                onClick={() => setEditingUser(null)}
              >
                Скасувати
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}