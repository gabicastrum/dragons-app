import { useState, type SubmitEventHandler } from "react";
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

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/dragoes");
    } else {
      alert("Usuário ou senha inválidos");
    }
  }

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
              onChange={(evento) => setEmail(evento.target.value)}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="SenhaForte@123"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
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