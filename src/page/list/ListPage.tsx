import { Header } from '../../components/header/Header'
import { DragonCard } from '../../components/dragon-card/DragonCard'
import { type IDragon } from '../../interfaces/dragon'
import { listarDragoes, deletarDragao } from '../../services/dragonService'
import { useEffect, useState } from 'react'
import { Button } from '../../components/button/Button'
import './ListPage.css'
import { useNavigate } from 'react-router-dom'
import { ConfirmModal } from '../../components/confirm-modal/ConfirmModal'
import { EmptyState } from '../../components/empty-state/EmptyState'
import { Loading } from '../../components/loading/Loading'

function ListPage() {
  const [dragoes, setDragoes] = useState<IDragon[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [toast, setToast] = useState<{
    tipo: 'success' | 'error'
    message: string
  } | null>(null)
  const navigate = useNavigate()

  const handleViewDetails = (id: string) => {
    navigate(`/dragoes/${id}`)
  }

  const handleEdit = (id: string) => {
    navigate(`/dragoes/${id}/editar`)
  }

  const showToast = (tipo: 'success' | 'error', message: string) => {
    setToast({ tipo, message })
    setTimeout(() => setToast(null), 2000)
  }

  const handleDelete = async () => {
    if (!idParaDeletar) return
    try {
      await deletarDragao(idParaDeletar)
      setDragoes((prev) => prev.filter((d) => d.id !== idParaDeletar))
      showToast('success', 'Dragão deletado com sucesso!')
    } catch {
      showToast('error', 'Erro ao deletar o dragão. Tente novamente.')
    } finally {
      setIdParaDeletar(null)
    }
  }

  useEffect(() => {
    async function carregarDragoes() {
      try {
        setLoading(true)
        setError(false)

        const data = await listarDragoes()

        const ordenados = [...data].sort((a, b) => a.name.localeCompare(b.name))

        setDragoes(ordenados)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    carregarDragoes()
  }, [])

  if (loading) {
    return <Loading message="Buscando dragões..." />
  }

  if (error) {
    return (
      <div>
        <Header />
        <main className="container">
          <EmptyState
            title="Erro ao carregar dragões"
            description="Tente novamente mais tarde."
          />
        </main>
      </div>
    )
  }

  return (
    <div>
      {toast && (
        <div className={`toast toast-${toast.tipo}`}>{toast.message}</div>
      )}
      <Header />
      <main className="container">
        <div className="list-header">
          <div className="list-tittle">
            <h1>Lista de Dragões</h1>
          </div>
        </div>
        <div className="btn-register-container">
          {dragoes.length > 0 && (
            <Button
              className="btn-register"
              onClick={() => navigate('/cadastro')}
            >
              Cadastre aqui o seu dragão
            </Button>
          )}
        </div>
        <section className="cardSection">
          {dragoes.length === 0 ? (
            <EmptyState onAction={() => navigate('/cadastro')} />
          ) : (
            dragoes.map((dragao) => (
              <DragonCard
                key={dragao.id}
                dragon={dragao}
                onEdit={handleEdit}
                onDelete={(id) => setIdParaDeletar(id)}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </section>
        {idParaDeletar && (
          <ConfirmModal
            mensagem="Tem certeza que deseja deletar este dragão?"
            onConfirm={handleDelete}
            onCancel={() => setIdParaDeletar(null)}
          />
        )}
      </main>
    </div>
  )
}

export default ListPage
