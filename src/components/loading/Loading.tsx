import { Header } from "../header/Header";
import "./Loading.css";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div>
    <Header />
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
    </div>
  );
}