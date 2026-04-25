import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function TestTake() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

const loadQuestions = async () => {
  const res = await API.get(`/questions/test/${id}`);

  console.log("RAW:", res.data);

  setQuestions(Array.isArray(res.data) ? res.data : []);
};

  const updateAnswer = (questionId, data) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, ...data }];
    });
  };

  //SINGLE / MULTI
  const handleSelect = (qId, answerId, type) => {
    const existing = answers.find((a) => a.questionId === qId);

    if (type === "SINGLE_CHOICE") {
      updateAnswer(qId, {
        selectedAnswerIds: [answerId],
      });
    }

    if (type === "MULTIPLE_CHOICES") {
      let selected = existing?.selectedAnswerIds || [];

      if (selected.includes(answerId)) {
        selected = selected.filter((id) => id !== answerId);
      } else {
        selected.push(answerId);
      }

      updateAnswer(qId, {
        selectedAnswerIds: selected,
      });
    }
  };

  // OPEN ANSWER
  const handleText = (qId, value) => {
    updateAnswer(qId, {
      textAnswer: value,
    });
  };

  // SUBMIT
  const submitTest = async () => {
    const res = await API.post("/results/submit", {
      testId: Number(id),
      studentId: 1, // TODO взяти з JWT
      answers,
    });

    setResult(res.data);
  };

  return (
    <div>
      <Navbar />

      <h2>Test</h2>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <h4>{q.content}</h4>

          {/* SINGLE */}
          {q.type === "SINGLE_CHOICE" &&
            q.answers?.map((a) => (
              <div key={a.id}>
                <label>
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    onChange={() =>
                      handleSelect(q.id, a.id, q.type)
                    }
                  />
                  {a.content}
                </label>
              </div>
            ))}

          {/* MULTI */}
          {q.type === "MULTIPLE_CHOICES" &&
            q.answers?.map((a) => (
              <div key={a.id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleSelect(q.id, a.id, q.type)
                    }
                  />
                  {a.content}
                </label>
              </div>
            ))}

          {/* OPEN */}
          {q.type === "OPEN_ANSWER" && (
            <input
              placeholder="Your answer"
              onChange={(e) =>
                handleText(q.id, e.target.value)
              }
            />
          )}
        </div>
      ))}

      {!result && (
        <button onClick={submitTest}>Submit</button>
      )}

      {result && (
        <div>
          <h3>Result: {result.score}</h3>

          <button onClick={() => navigate("/tests")}>
            Back to tests
          </button>
        </div>
      )}
    </div>
  );
}