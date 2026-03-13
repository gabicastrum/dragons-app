import { Header } from "../../components/header/Header";
import { DragonCard } from '../../components/dragon-card/DragonCard';
import { type IDragon } from '../../interfaces/dragon';
import  { listarDragoes } from "../../services/dragonService";
import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import "./ListPage.css"
import { useNavigate } from "react-router-dom";

const handleDelete = (id: string) => console.log("Excluindo:", id);

function ListPage() {
  const [dragoes, setDragoes] = useState<IDragon[]>([]);
  const navigate = useNavigate();
  
  const handleViewDetails = (id: string) => {
    navigate(`/dragoes/${id}`)
  }
  
  const handleEdit = (id: string) => {
    navigate(`/dragoes/${id}/editar`)
  };

  useEffect(() => {
    async function carregarDragoes() {
      const data = await listarDragoes();
      const ordenados = data.sort((a: IDragon, b: IDragon) => 
        a.name.localeCompare(b.name)
    );
    setDragoes(ordenados);
  }
  carregarDragoes();
}, []);

  return (
    <div>
      <Header />
      <main className="container">
        <div className="list-header">
          <div className="list-tittle">
            <h1>Lista de Dragões</h1>
          </div>
        </div>
        <div className="btn-register-container">
          <Button className="btn-register" onClick={() => navigate("/cadastro")}>Cadastre aqui o seu dragão</Button>
        </div>
       <section className="cardSection">
          {dragoes.map((dragao) => (
            <DragonCard
              key={dragao.id}
              dragon={dragao}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default ListPage;