import { useState, type SubmitEventHandler, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/input/Input";
import { Header } from "../../components/header/Header";
import { Button } from "../../components/button/Button";
import "./LoginPage.css";

export default function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    
    const sucesso = login(email, password);
    
    if (sucesso) {
      navigate("/dragoes");
    } else {
      setError("Usuário ou senha inválidos");
      setTimeout(() => {
        setError("");
      }, 1500)
    }
  };

  return (
  <div>
    <Header />
    {error && <div className="toast">{error}</div>}
      <main className="container">
      <section className="login-card">
        <h1>Bem-vindo ao Sistema de Gerenciamento de Dragões!</h1>
        <form className="login-form" onSubmit={handleSubmit}>

            <Input
              label="E-mail"
              type="email"
              placeholder="exemplo@dragao.com"
              value={email}
              onChange={handleEmailChange}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="senha"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button
              type="submit"
              variante="primary"
            >
              Entrar
            </Button>

          </form>
        </section>
      </main>
    </div>
  );
}