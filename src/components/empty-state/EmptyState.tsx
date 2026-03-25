import { Button } from '../button/Button'
import './EmptyState.css'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: string
}

export function EmptyState({
  title = 'Nenhum dragão cadastrado :(',
  description = 'Que tal adicionar o seu primeiro dragão?',
  actionLabel = 'Cadastre aqui o seu primeiro dragão',
  onAction,
  icon = '🐉',
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">{icon}</span>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-description">{description}</p>

      {onAction && actionLabel && (
        <div className="empty-state-btn-register-container">
          <Button className="empty-state-btn-register" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
