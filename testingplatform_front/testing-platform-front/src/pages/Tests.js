import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Tests() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  const loadTests = async () => {
    const res = await API.get("/tests");
    setTests(res.data);
  };

  useEffect(() => {
    loadTests();
  }, []);

  return (
    <div>
      <Navbar />

      <h2>Available Tests</h2>

{Array.isArray(tests) &&
  tests.map((t) => (
    <div key={t.id}>
      <h4>{t.title}</h4>
      <button onClick={() => navigate(`/test/${t.id}`)}>
        Start
      </button>
    </div>
))}
    </div>
  );
}