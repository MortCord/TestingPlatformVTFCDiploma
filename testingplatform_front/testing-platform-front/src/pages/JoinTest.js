import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function JoinTest() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const join = async () => {
    try {
      const res = await API.post(`/tests/join?code=${code}`);
      navigate(`/test/${res.data.id}`);
    } catch {
      alert("Не правильний код доступу або час проходження вже минув");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container-ui" style={{ maxWidth: 500 }}>

        <div className="card-ui" style={{ marginTop: 20 }}>

          <h2 style={{ marginBottom: 10 }}>Почати тест за кодом</h2>

          <input
            className="input-ui"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введіть код доступу"
          />

          <button
            className="btn-ui btn-primary"
            onClick={join}
          >
            Почати тест
          </button>

        </div>

      </div>
    </div>
  );
}