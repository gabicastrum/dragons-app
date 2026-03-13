import "./ConfirmModal.css"
import { Button } from "../button/Button";

interface ConfirmModalProps {
  mensagem: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ mensagem, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{mensagem}</p>
        <div className="modal-actions">
          <Button variante="primary" className="btn-cancel" onClick={onCancel}>Cancelar</Button>
          <Button variante="danger" className="btn-excluir" onClick={onConfirm}>Excluir</Button>
        </div>
      </div>
    </div>
  );
}