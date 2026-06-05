import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Tests() {
  const [tests, setTests] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const loadTests = async () => {
    try {
      const res = await API.get("/tests");
      setTests(res.data);
    } catch (err) {
      console.log(err);
      alert("Помилка при завантаженні тестів");
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  const filteredTests = tests.filter((t) => {
    const matchesSubject =
      subjectFilter === "" ? true : t.subject === subjectFilter;

    const q = search.toLowerCase();

    const matchesSearch =
      t.title?.toLowerCase().includes(q) ||
      t.subject?.toLowerCase().includes(q) ||
      t.createdBy?.email?.toLowerCase().includes(q);

    return matchesSubject && matchesSearch;
  });

  return (
    <div>
      <Navbar />

      <div className="container-ui">

        <h1 style={{ marginBottom: 15 }}>
          Доступні тести
        </h1>

        {/* FILTER */}
        <div style={{ marginBottom: 20 }}>
          <select
            className="select-ui"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">Всі предмети</option>
            <option value="Math">Математика</option>
            <option value="Physics">Фізика</option>
            <option value="Programming">Програмування</option>
            <option value="English">Англійська мова</option>
            <option value="History">Історія</option>
            <option value="Other">Інше</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid-ui">

          {filteredTests.map((t) => (
            <div className="card-ui" key={t.id}>

              <h3 style={{ marginBottom: 8 }}>
                {t.title}
              </h3>

              <p style={{ margin: 0, color: "#6b7280" }}>
                {t.subject}
              </p>

              <p style={{ margin: "6px 0", fontSize: 14 }}>
                Автор: {t.createdBy?.email}
              </p>

              <button
                className="btn-ui btn-primary"
                style={{ marginTop: 10 }}
                onClick={() => navigate(`/test/${t.id}`)}
              >
                Почати тест
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}