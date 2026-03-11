import { useState, type SubmitEventHandler, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/input/Input";
import { Header } from "../../components/header/Header";
import { Button } from "../../components/button/Button";

export default function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/dragoes");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div>
      <Header />
      <main className="container">
        <section>
          <h1>Bem-vindo ao App dos Dragões!</h1>
          <form onSubmit={handleSubmit}>

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
              placeholder="SenhaForte@123"
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