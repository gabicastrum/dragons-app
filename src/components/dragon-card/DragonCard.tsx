import { type IDragon } from '../../interfaces/dragon';
import { Button } from '../button/Button';
import './DragonCard.css';

interface DragonCardProps {
  dragon: IDragon;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function DragonCard({ dragon, onEdit, onDelete, onViewDetails }: DragonCardProps) {
  const dateFormatted = new Date(dragon.createdAt).toLocaleDateString('pt-BR');

  return (
    <article className= "card">
      <div className= "clickableArea" onClick={() => onViewDetails(dragon.id)}>
        <span className= "date">{dateFormatted}</span>
        <h3 className= "name">{dragon.name}</h3>
        <p className= "type">
          Tipo: <span>{dragon.type}</span>
        </p>
      </div>

      <footer className= "actions">
        <Button variante="primary" onClick={() => onEdit(dragon.id)}>
          Editar
        </Button>
        <Button variante="danger" onClick={() => onDelete(dragon.id)}>
          Excluir
        </Button>
      </footer>
    </article>
  );
}