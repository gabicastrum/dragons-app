import { Header } from "./components/header/Header"
import { Button } from "./components/button/Button"

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Bem-vindo ao App dos Dragões!</h1>
        <p>Esta é a página principal da aplicação.</p>
      </main>
      <Button variante="primary" onClick={() => console.log("Reutilizado!")}>
        Click me para reutilizar!
        </Button>
    </div>
  )
}

export default App
