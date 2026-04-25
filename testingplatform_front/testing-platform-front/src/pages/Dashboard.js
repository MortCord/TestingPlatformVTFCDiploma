import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");



  return (
      <div>
        <Navbar />

        <div>
          <h1>Welcome to Dashboard Page</h1>
        </div>
      </div>
  );
}