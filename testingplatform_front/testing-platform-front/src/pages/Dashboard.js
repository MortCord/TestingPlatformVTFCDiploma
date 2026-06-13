import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import "./styles/Dashboard.scss";

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      setStudentId(user.id);
    }
  }, []);

  useEffect(() => {
    if (studentId) loadResults();
  }, [studentId]);

  const loadResults = async () => {
    const res = await API.get(`/results/student/${studentId}`);
    setResults(res.data);
  };

  const averageScore =
    results.length > 0
      ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(2)
      : 0;

  return (
    <>
      <Navbar />

      <div className="container-ui">

        <h1 style={{ marginBottom: 5 }}>Головна</h1>
        <p style={{ color: "var(--muted)", marginBottom: 20 }}>
          Відстежуйте свій прогрес у навчанні та результати тестів.
        </p>
        <div className="card-ui" style={{ marginBottom: 20 }}>
          <h3>Середній бал</h3>
          <div style={{ fontSize: 32, fontWeight: "bold", color: "var(--primary)" }}>
            {averageScore}
          </div>
        </div>
        <h2 style={{ marginBottom: 10 }}>Ваші тести</h2>

        {results.length === 0 ? (
          <div className="card-ui">
            Ще немає пройдених тестів
          </div>
        ) : (
          <div className="grid-ui">
            {results.map((r) => (
              <div className="card-ui" key={r.id}>
                <h3>{r.test?.title}</h3>
                <p style={{ color: "var(--muted)" }}>
                  Кількість балів: <b>{r.score}</b>
                </p>
              </div>
            ))}
          </div>
        )}

        <h2 style={{ marginTop: 30 }}>Функції платформи</h2>

        <div className="grid-ui">
          <div className="card-ui">
            <h3>Проходьте тести</h3>
            <p style={{ color: "var(--muted)" }}>Проходьте тести та навчайтеся.</p>
          </div>

          <div className="card-ui">
            <h3>Відстежуйте прогрес</h3>
            <p style={{ color: "var(--muted)" }}>Відстежуйте свій навчальний шлях.</p>
          </div>

          <div className="card-ui">
            <h3>Аналітика</h3>
            <p style={{ color: "var(--muted)" }}>Діаграми та аналітика у майбутньому.</p>
          </div>
        </div>

      </div>
    </>
  );
}