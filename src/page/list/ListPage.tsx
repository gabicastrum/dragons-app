import { Header } from "../../components/header/Header";
import { DragonCard } from '../../components/dragon-card/DragonCard';
import { type IDragon } from '../../interfaces/dragon';

function ListPage() {

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

export default ListPage;