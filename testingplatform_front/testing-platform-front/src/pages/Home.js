import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Testing Platform</h1>
      <p>Welcome to the system for tests and learning</p>

      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}