import { useState } from 'react';
import { Header } from "./components/header/Header"
import { Button } from "./components/button/Button"
import { Input } from "./components/input/Input"

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Bem-vindo ao App dos Dragões!</h1>
        <p>Esta é a página principal da aplicação.</p>
        <form>
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
      <Button type= "submit" variante="primary" onClick={() => console.log("Enviado!" + email)}>
        Click aqui para enviar
        </Button>
        </form>
      </main>
    </div>
  )
}

export default App
