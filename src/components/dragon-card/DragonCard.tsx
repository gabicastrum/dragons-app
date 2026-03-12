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

  return (
    <article className= "card">
      <div className= "clickableArea" onClick={() => onViewDetails(dragon.id)}>
        <h3 className= "name">{dragon.name}</h3>
      </div>

      <div className= "actions">
        <Button variante="primary" onClick={() => onEdit(dragon.id)}>
          Editar
        </Button>
        <Button variante="danger" onClick={() => onDelete(dragon.id)}>
          Excluir
        </Button>
      </div>
    </article>
  );
} 