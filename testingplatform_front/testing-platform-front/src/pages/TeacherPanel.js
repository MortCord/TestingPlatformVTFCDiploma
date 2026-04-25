import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";




export default function TeacherPanel() {
  const [teacherId, setTeacherId] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  console.log(jwtDecode(token));
  if (token) {
    const user = jwtDecode(token);
    setTeacherId(user.id);
  }
}, []);
  const [tests, setTests] = useState([]);
  const [title, setTitle] = useState("");

  const [selectedTest, setSelectedTest] = useState(null);

  // question state
  const [qText, setQText] = useState("");
  const [qType, setQType] = useState("SINGLE_CHOICE");

  const [answers, setAnswers] = useState([
    { content: "", isCorrect: false }
  ]);

  

useEffect(() => {
  if (teacherId) {
    loadTests();
  }
}, [teacherId]);

  const loadTests = async () => {
    const res = await API.get(`/tests/teacher/${teacherId}`);
    console.log(res.data);
    setTests(res.data);
  };

  // 🧪 create test
  const createTest = async () => {
    await API.post("/tests", {
      title,
      teacherId,
    });

    setTitle("");
    loadTests();
  };
  const addQuestion = async () => {
    console.log(answers);
    const res = await API.post("/questions", {
      content: qText,
      type: qType,
      testId: selectedTest.id,
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
    alert("Question added");
  };

  // 🧠 update answer
  const updateAnswer = (index, field, value) => {
    const copy = [...answers];
    copy[index][field] = value;
    setAnswers(copy);
  };

  const addAnswerField = () => {
    setAnswers([...answers, { content: "", isCorrect: false }]);
  };

  return (
    <div>
      <Navbar />

      <h2>Teacher Panel</h2>

      {/* CREATE TEST */}
      <input
        placeholder="Test title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTest}>Create test</button>

      <hr />

      {/* TEST LIST */}
      <h3>Your tests</h3>
{Array.isArray(tests) &&
  tests.map((t) => (
<div key={t.id} onClick={() => setSelectedTest(t)}>
  <h4>{t.title}</h4>
</div>
  ))}

      {/* QUESTION BUILDER */}
      {selectedTest && (
        <div style={{ marginTop: 20 }}>
          <h3>Test: {selectedTest.title}</h3>

          <h4>Add question</h4>

          <input
            placeholder="Question text"
            value={qText}
            onChange={(e) => setQText(e.target.value)}
          />

          <select
            value={qType}
            onChange={(e) => setQType(e.target.value)}
          >
            <option value="SINGLE_CHOICE">Single</option>
            <option value="MULTIPLE_CHOICES">Multiple</option>
            <option value="OPEN_ANSWER">Open</option>
          </select>

          {/* ANSWERS */}
          {qType !== "OPEN_ANSWER" && (
            <div>
              <h4>Answers</h4>

              {answers.map((a, i) => (
                <div key={i}>
                  <input
                    placeholder="answer"
                    value={a.content}
                    onChange={(e) =>
                      updateAnswer(i, "content", e.target.value)
                    }
                  />

                  <label>
<input
  type="checkbox"
  checked={!!a.isCorrect}
  onChange={(e) => updateAnswer(i, "isCorrect", e.target.checked)}
/>
                    correct
                  </label>
                </div>
              ))}

              <button onClick={addAnswerField}>
                + Add answer
              </button>
            </div>
          )}

          <button onClick={addQuestion}>
            Add question
          </button>
        </div>
      )}
    </div>
  );
}