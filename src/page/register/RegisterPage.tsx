import { DragonForm } from '../../components/dragon-form/DragonForm'
import { Header } from '../../components/header/Header'
import { cadastrarDragao } from '../../services/dragonService'

function RegisterPage() {
  return (
    <div>
      <Header />
      <main className="container">
        <DragonForm
          titulo="Realize o cadastro do seu dragão"
          mensagemSucesso={`cadastrado com sucesso!`}
          onSubmit={cadastrarDragao}
        />
      </main>
    </div>
  )
}

export default RegisterPage
