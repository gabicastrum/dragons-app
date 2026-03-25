import { type IDragon } from '../../interfaces/dragon'
import { Button } from '../button/Button'
import './DragonCard.css'

interface DragonCardProps {
  dragon: IDragon
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onViewDetails: (id: string) => void
}

export function DragonCard({
  dragon,
  onEdit,
  onDelete,
  onViewDetails,
}: DragonCardProps) {
  return (
    <article className="card">
      <div className="clickableArea" onClick={() => onViewDetails(dragon.id)}>
        <h3 className="name">{dragon.name}</h3>
      </div>

      <div className="actions">
        <Button
          className="btn-edit"
          variante="primary"
          aria-label="Editar"
          onClick={() => onEdit(dragon.id)}
        >
          <span className="icon-edit">&#x270F;</span>
        </Button>
        <Button
          className="btn-delete"
          variante="danger"
          aria-label="Excluir"
          onClick={() => onDelete(dragon.id)}
        >
          &#x2715;
        </Button>
      </div>
    </article>
  )
}
