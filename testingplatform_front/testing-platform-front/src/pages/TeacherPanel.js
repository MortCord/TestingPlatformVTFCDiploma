import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import "./styles/TeacherPanel.scss";

export default function TeacherPanel() {
  const [teacherId, setTeacherId] = useState(null);

  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Other");

  const [qText, setQText] = useState("");
  const [qType, setQType] = useState("SINGLE_CHOICE");

  const [visibility, setVisibility] = useState("PUBLIC");
  const [lifetime, setLifetime] = useState(60);

  const [qImage, setQImage] = useState("");

  const [imageFile, setImageFile] = useState(null);

  const [answers, setAnswers] = useState([
    { content: "", isCorrect: false }
  ]);

  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      setTeacherId(user.id);
    }
  }, []);

  useEffect(() => {
    if (teacherId) loadTests();
  }, [teacherId]);

  const loadTests = async () => {
    const res = await API.get(`/tests/teacher/${teacherId}`);
    setTests(res.data);
  };

  const loadQuestions = async (testId) => {
    const res = await API.get(`/questions/test/${testId}`);
    setQuestions(res.data);
  };

  const loadResults = async (testId) => {
    const res = await API.get(`/results/test/${testId}`);
    setResults(res.data);
  };

  const selectTest = (t) => {
    setSelectedTest(t);
    loadQuestions(t.id);
    loadResults(t.id);
  };

  const createTest = async () => {
    await API.post("/tests", {
      title,
      subject,
      teacherId,
      visibility,
      codeLifetimeMinutes: lifetime
    });

    setTitle("");
    loadTests();
  };

  const deleteTest = async (id) => {
  await API.delete(`/tests/${id}`);

  if (selectedTest?.id === id) {
    setSelectedTest(null);
    setQuestions([]);
    setResults([]);
  }

  loadTests();
};

const addQuestion = async () => {
  const formData = new FormData();

  formData.append("content", qText);
  formData.append("type", qType);
  formData.append("testId", selectedTest.id);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await API.post("/questions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const questionId = res.data.id;

  for (let a of answers) {
    await API.post("/answers", {
      content: a.content,
      isCorrect: a.isCorrect,
      matchGroup: "",
      questionId,
    });
  }

  setQText("");
  setAnswers([{ content: "", isCorrect: false }]);
  setImageFile(null);
  loadQuestions(selectedTest.id);
};

  const deleteQuestion = async (id) => {
    await API.delete(`/questions/${id}`);
    loadQuestions(selectedTest.id);
  };

  const updateAnswer = (i, field, value) => {
    const copy = [...answers];
    copy[i][field] = value;
    setAnswers(copy);
  };

  const addAnswerField = () => {
    setAnswers([...answers, { content: "", isCorrect: false }]);
  };

  return (
    <>
      <Navbar />

      <div className="container-ui">

        <h1>Панель вчителя</h1>

        <div className="card-ui card-hover">
          <h3>Створити тест</h3>

          <input
            className="input-ui"
            placeholder="Назва тесту"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="select-ui"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="Math">Математика</option>
            <option value="Physics">Фізика</option>
            <option value="Programming">Програмування</option>
            <option value="English">Англійська мова</option>
            <option value="History">Історія</option>
            <option value="Other">Інше</option>
          </select>

          <select
            className="select-ui"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="PUBLIC">Відкритий для всіх</option>
            <option value="PRIVATE">За кодом</option>
          </select>

          {visibility === "PRIVATE" && (
            <input
              className="input-ui"
              type="number"
              placeholder="Code lifetime"
              value={lifetime}
              onChange={(e) => setLifetime(e.target.value)}
            />
          )}

          <button className="btn-ui btn-primary" onClick={createTest}>
            Створити тест
          </button>
        </div>

<div className="grid-ui" style={{ marginTop: 20 }}>
  {tests.map((t) => (
    <div
      key={t.id}
      className="card-ui card-hover"
      onClick={() => selectTest(t)}
    >
      <h3>{t.title}</h3>

      <p style={{ color: "var(--muted)" }}>
        {t.subject}
      </p>

      <p>
        Тип: <b>{t.visibility}</b>
      </p>

      {t.visibility === "PRIVATE" && (
        <div style={{ marginTop: 10 }}>
          <p>
            Код доступу: <b>{t.accessCode || "Немає коду"}</b>
          </p>

          {t.accessCode && (
            <button
              className="btn-ui btn-gray"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(t.accessCode);
              }}
            >
              Скопіювати код
            </button>
          )}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <button
          className="btn-ui btn-danger"
          onClick={(e) => {
            e.stopPropagation();
            deleteTest(t.id);
          }}
        >
          Видалити тест
        </button>
      </div>
    </div>
  ))}
</div>

        {selectedTest && (
          <div className="card-ui" style={{ marginTop: 20 }}>
            <h3>Питання</h3>

            {questions.map((q) => (
              <div
                key={q.id}
                className="card-ui"
                style={{ marginTop: 10 }}
              >
                <b>{q.content}</b>

                <div style={{ marginTop: 8 }}>
                  <button
                    className="btn-ui btn-danger"
                    onClick={() => deleteQuestion(q.id)}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedTest && (
          <div className="card-ui card-hover" style={{ marginTop: 20 }}>
            <h3>Додати питання</h3>

            <input
              className="input-ui"
              placeholder="Питання"
              value={qText}
              onChange={(e) => setQText(e.target.value)}
            />

<input
  type="file"
  accept="image/*"
  onChange={(e) => setImageFile(e.target.files[0])}
/>

            <select
              className="select-ui"
              value={qType}
              onChange={(e) => setQType(e.target.value)}
            >
              <option value="SINGLE_CHOICE">Один варіант відповіді</option>
              <option value="MULTIPLE_CHOICES">Декілька варіантів відповіді</option>
              <option value="OPEN_ANSWER">Відкрита відповідь</option>
            </select>

            {qType !== "OPEN_ANSWER" && (
              <>
                {answers.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <input
                      className="input-ui"
                      placeholder="Відповідь"
                      value={a.content}
                      onChange={(e) =>
                        updateAnswer(i, "content", e.target.value)
                      }
                    />

                    <label>
                      <input
                        type="checkbox"
                        checked={a.isCorrect}
                        onChange={(e) =>
                          updateAnswer(i, "isCorrect", e.target.checked)
                        }
                      />
                      Правильна
                    </label>
                  </div>
                ))}

                <button
                  className="btn-ui btn-gray"
                  onClick={addAnswerField}
                >
                  + Додати відповідь
                </button>
              </>
            )}

            <button
              className="btn-ui btn-primary"
              onClick={addQuestion}
              style={{ marginTop: 10 }}
            >
              Додати питання
            </button>
          </div>
        )}
        {selectedTest && (
          <div className="grid-ui" style={{ marginTop: 20 }}>
            {results.map((r) => (
              <div key={r.id} className="card-ui card-hover">
                <p>
                  Студент: <b>{r.student?.email}</b>
                </p>
                <p>
                  Кількість балів: <b>{r.score}</b>
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}