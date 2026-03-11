import { useState } from 'react';
import { Header } from "../../components/header/Header";
import { Button } from '../../components/button/Button';
import { Input } from "../../components/input/Input";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div>
      <Header />
      
      <main className="container">
        <section>
          <h1>Bem-vindo ao App dos Dragões!</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input 
              label="E-mail" 
              type="email"
              placeholder="exemplo@dragao.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              label="Senha" 
              type="password" 
              placeholder="SenhaForte@123"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button 
              type="submit" 
              variante="primary" 
              onClick={() => console.log("Login: " + email)}
            >
              Entrar
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;