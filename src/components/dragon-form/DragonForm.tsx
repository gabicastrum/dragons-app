import { useState } from 'react'
import { Input } from '../input/Input'
import { Button } from '../button/Button'
import { type IDragon } from '../../interfaces/dragon'
import { useNavigate } from 'react-router-dom'
import './DragonForm.css'

interface DragonFormProps {
  titulo: string
  initialData?: IDragon
  onSubmit: (dados: Omit<IDragon, 'id'>) => Promise<unknown>
  mensagemSucesso?: string
}

interface FormState {
  name: string
  type: string
  histories: string[]
  novaHistoria: string
}

export function DragonForm({
  titulo,
  initialData,
  onSubmit,
  mensagemSucesso,
}: DragonFormProps) {
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>({
    name: initialData?.name ?? '',
    type: initialData?.type ?? '',
    novaHistoria: '',
    histories: Array.isArray(initialData?.histories)
      ? initialData.histories
      : initialData?.histories
        ? [initialData.histories]
        : [],
  })

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{
    tipo: 'success' | 'error'
    message: string
  } | null>(null)

  const handleChange =
    (field: keyof Pick<FormState, 'name' | 'type' | 'novaHistoria'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const adicionarHistoria = () => {
    const trimmed = form.novaHistoria.trim()
    if (!trimmed) return
    setForm((prev) => ({
      ...prev,
      histories: [...prev.histories, trimmed],
      novaHistoria: '',
    }))
  }

  const removerHistoria = (index: number) =>
    setForm((prev) => ({
      ...prev,
      histories: prev.histories.filter((_, i) => i !== index),
    }))

  const handleHistoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      adicionarHistoria()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFeedback(null)

    if (!form.name.trim() || !form.type.trim()) {
      setFeedback({ tipo: 'error', message: 'Nome e tipo são obrigatórios.' })
      return
    }

    const payload: Omit<IDragon, 'id'> = {
      name: form.name.trim(),
      type: form.type.trim(),
      histories: form.histories,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    }

    try {
      setLoading(true)
      await onSubmit(payload)
      setFeedback({
        tipo: 'success',
        message: `Dragão "${payload.name}" ${mensagemSucesso ?? 'salvo com sucesso!'}`,
      })
    } catch {
      setFeedback({
        tipo: 'error',
        message: 'Erro ao salvar o dragão. Tente novamente.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="register-card">
      <div className="register-card-tittle">
        <Button
          type="button"
          className="btn-return"
          onClick={() => navigate('/dragoes')}
        >
          <span className="btn-return__arrow">&larr;</span>
        </Button>
        <h1>{titulo}</h1>
      </div>

      {feedback && (
        <div className={`feedback feedback-${feedback.tipo}`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label>Nome do Dragão</label>
          <Input
            id="name"
            type="text"
            placeholder="Ex: Fúria da Noite"
            value={form.name}
            onChange={handleChange('name')}
            required
          />
        </div>

        <div className="field">
          <label>Tipo</label>
          <Input
            id="type"
            type="text"
            placeholder="Ex: Fogo, Gelo, etc"
            value={form.type}
            onChange={handleChange('type')}
            required
          />
        </div>

        <div className="field">
          <label>Data de Cadastro</label>
          <Input
            type="text"
            value={
              initialData
                ? new Date(initialData.createdAt).toLocaleString('pt-BR')
                : new Date().toLocaleString('pt-BR')
            }
            disabled
            title="Gerada automaticamente ao salvar"
          />
          <span>Gerada automaticamente ao salvar</span>
        </div>

        <div className="field">
          <label>Adicionar História</label>
          <div className="history-input-row">
            <Input
              id="novaHistoria"
              type="text"
              placeholder="Ex: Nasceu na Ilha de Berk"
              value={form.novaHistoria}
              onChange={handleChange('novaHistoria')}
              onKeyDown={handleHistoryKeyDown}
            />
            <button
              type="button"
              className="btn btn-add"
              onClick={adicionarHistoria}
              disabled={!form.novaHistoria.trim()}
            >
              + Adicionar
            </button>
          </div>
          <span>
            Pressione Enter ou clique em "+ Adicionar" para inserir cada
            história
          </span>
        </div>

        {form.histories.length > 0 && (
          <ul className="history-list">
            {form.histories.map((h, i) => (
              <li key={i} className="history-item">
                <span>{h}</span>
                <Button
                  type="button"
                  className="history-remove"
                  onClick={() => removerHistoria(i)}
                  aria-label="Remover história"
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>
        )}

        <Button type="submit" className="btn btn-cadastro" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Dragão'}
        </Button>
      </form>
    </section>
  )
}
