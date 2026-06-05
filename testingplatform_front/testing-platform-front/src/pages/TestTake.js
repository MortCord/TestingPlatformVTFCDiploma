import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";

export default function TestTake() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = jwtDecode(token);
    setStudentId(user.id);
  }
}, []);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const res = await API.get(`/questions/test/${id}`);
    console.log(res.data);
    setQuestions(Array.isArray(res.data) ? res.data : []);
  };

  const currentQuestion = questions[currentIndex];

  const updateAnswer = (questionId, data) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, ...data }];
    });
  };

  const handleSelect = (qId, answerId, type) => {
    const existing = answers.find((a) => a.questionId === qId);

    if (type === "SINGLE_CHOICE") {
      updateAnswer(qId, { selectedAnswerIds: [answerId] });
    }

    if (type === "MULTIPLE_CHOICES") {
      let selected = existing?.selectedAnswerIds || [];

      if (selected.includes(answerId)) {
        selected = selected.filter((id) => id !== answerId);
      } else {
        selected.push(answerId);
      }

      updateAnswer(qId, { selectedAnswerIds: selected });
    }
  };

  const handleText = (qId, value) => {
    updateAnswer(qId, { textAnswer: value });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

const submitTest = async () => {
  if (!studentId) {
    alert("User not loaded");
    return;
  }

  const res = await API.post("/results/submit", {
    testId: Number(id),
    studentId,
    answers,
  });

  setResult(res.data);
};

  if (!currentQuestion && !result) {
    return (
      <div className="container-ui">
        <Navbar />
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container-ui">

        {!result && currentQuestion && (
          <div className="card-ui">

            <div style={{ marginBottom: 10 }}>
              Питання {currentIndex + 1} / {questions.length}
            </div>

            {/* PROGRESS */}
            <div
              style={{
                height: "10px",
                background: "#e5e7eb",
                borderRadius: "10px",
                marginBottom: "15px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  height: "100%",
                  background: "#4f46e5",
                }}
              />
            </div>

            <h3 style={{ marginBottom: 15 }}>
              {currentQuestion.content}
            </h3>

            {/* IMAGE */}
{currentQuestion.imageUrl && (
  <img
    src={`http://localhost:8080${currentQuestion.imageUrl}`}
    alt="question"
    style={{
      maxWidth: "100%",
      borderRadius: "12px",
      marginBottom: "15px"
    }}
  />
)}

            {/* SINGLE */}
            {currentQuestion.type === "SINGLE_CHOICE" &&
              currentQuestion.answers?.map((a) => (
                <label key={a.id} style={{ display: "block", marginBottom: 8 }}>
                  <input
                    type="radio"
                    name={`q-${currentQuestion.id}`}
                    onChange={() =>
                      handleSelect(currentQuestion.id, a.id, currentQuestion.type)
                    }
                  />{" "}
                  {a.content}
                </label>
              ))}

            {/* MULTI */}
            {currentQuestion.type === "MULTIPLE_CHOICES" &&
              currentQuestion.answers?.map((a) => (
                <label key={a.id} style={{ display: "block", marginBottom: 8 }}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleSelect(currentQuestion.id, a.id, currentQuestion.type)
                    }
                  />{" "}
                  {a.content}
                </label>
              ))}

            {/* OPEN */}
            {currentQuestion.type === "OPEN_ANSWER" && (
              <input
                className="input-ui"
                placeholder="Ваша відповідь"
                onChange={(e) =>
                  handleText(currentQuestion.id, e.target.value)
                }
              />
            )}

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              {currentIndex < questions.length - 1 && (
                <button className="btn-ui btn-primary" onClick={nextQuestion}>
                  Далі
                </button>
              )}

              {currentIndex === questions.length - 1 && (
                <button className="btn-ui btn-primary" onClick={submitTest}>
                  Закінчити
                </button>
              )}
            </div>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="card-ui" style={{ textAlign: "center", marginTop: 40 }}>
            <h1>Ваша оцінка</h1>
            <h2 style={{ color: "#4f46e5" }}>{result.score}</h2>

            <button
              className="btn-ui btn-primary"
              onClick={() => navigate("/tests")}
            >
              Назад
            </button>
          </div>
        )}

      </div>
    </div>
  );
}