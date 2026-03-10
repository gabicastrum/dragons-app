import { useState } from 'react';
import { Header } from "./components/header/Header";
import { Button } from "./components/button/Button";
import { Input } from "./components/input/Input";
import { DragonCard } from './components/dragon-card/DragonCard';
import { type IDragon } from './interfaces/dragon';

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const dragao: IDragon = {
    id: '1',
    name: 'Banguela',
    type: 'Dragão doméstico',
    createdAt: new Date().toISOString(),
    histories: []
  };

  const handleEdit = (id: string) => console.log("Editando:", id);
  const handleDelete = (id: string) => console.log("Excluindo:", id);
  const handleViewDetails = (id: string) => console.log("Detalhes:", id);

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

        <hr className="divider" />

        <section className="cardSection">
          <DragonCard 
            dragon={dragao} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onViewDetails={handleViewDetails} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;