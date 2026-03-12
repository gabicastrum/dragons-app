import { Header } from "../../components/header/Header";
import { DragonCard } from '../../components/dragon-card/DragonCard';
import { type IDragon } from '../../interfaces/dragon';
import  { listarDragoes } from "../../services/dragonService";
import { useEffect, useState } from "react";
import "./ListPage.css"

const handleEdit = (id: string) => console.log("Editando:", id);
const handleDelete = (id: string) => console.log("Excluindo:", id);
const handleViewDetails = (id: string) => console.log("Detalhes:", id);


function ListPage() {
  const [dragoes, setDragoes] = useState<IDragon[]>([]);
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
        <hr className="divider" />
        <section className="cardSection">
          {dragoes.map((dragao) => (
            <DragonCard
            key={dragao.id}
            dragon={dragao}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
            />))}
        </section>
      </main>
    </div>
  );
}

export default ListPage;