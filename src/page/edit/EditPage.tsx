import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { DragonForm } from '../../components/dragon-form/DragonForm'
import {
  buscarDragaoPorId,
  atualizarDragao,
} from '../../services/dragonService'
import { type IDragon } from '../../interfaces/dragon'
import { Loading } from '../../components/loading/Loading'
import { EmptyState } from '../../components/empty-state/EmptyState'

function EditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [dragon, setDragon] = useState<IDragon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregar = async () => {
      try {
        if (!id) return
        setLoading(true)
        const data = await buscarDragaoPorId(id)
        setDragon(data)
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [id])

  const handleUpdate = async (dados: Omit<IDragon, 'id'>) => {
    if (!id) return
    await atualizarDragao(id, dados)
  }

  if (loading) {
    return <Loading message="Buscando informações do dragão..." />
  }

  if (!dragon) {
    return (
      <div>
        <Header />
        <main className="container">
          <EmptyState
            title="Dragão não encontrado"
            onAction={() => navigate('/dragoes')}
            actionLabel="Voltar para a lista"
          />
        </main>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main className="container">
        <DragonForm
          titulo="Editar detalhes do dragão"
          mensagemSucesso="Dragão atualizado com sucesso!"
          initialData={dragon}
          onSubmit={handleUpdate}
        />
      </main>
    </div>
  )
}

export default EditPage
