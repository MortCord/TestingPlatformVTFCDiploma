import { Link } from "react-router-dom";
import "./styles/Home.scss";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-card card-ui">
        <h1 className="home-title">Testikify</h1>

        <p className="home-text">
          Створюйте тести, проходьте екзамени та відстежуйте свій прогрес.
        </p>

        <div className="home-actions">
          <Link to="/login" className="btn-ui btn-primary">
            Увійти
          </Link>

          <Link to="/register" className="btn-ui btn-gray">
            Створити обліковий запис
          </Link>
        </div>
      </div>
    </div>
  );
}