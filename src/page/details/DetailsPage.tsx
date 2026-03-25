import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { type IDragon } from "../../interfaces/dragon";
import { buscarDragaoPorId } from "../../services/dragonService";
import { Button } from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailsPage.css";
import { Loading } from "../../components/loading/Loading";
import { EmptyState } from "../../components/empty-state/EmptyState";

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [dragon, setDragon] = useState<IDragon | null>(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
      const carregarDragao = async () => {
      try {
        if (!id) return;
        setLoading(true);
        setError(false);
      
        const data = await buscarDragaoPorId(id);
        setDragon(data);
     } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    carregarDragao();
  }, [id]);

  if (loading) {
    return <Loading message="Buscando detalhes do dragão..." />;
  }

  if (error) {
  return (
    <div>
      <Header />
      <main className="container">
        <EmptyState
          title="Erro ao carregar dragão"
          description="Tente novamente mais tarde."
          actionLabel="Voltar para a lista"
          icon="⚠️"
          onAction={() => navigate("/dragoes")}
        />
      </main>
    </div>
    );
  }

  if (!dragon) {
    return (
      <div>
        <Header />
        <main className="container">
          <EmptyState
          title="Dragão não encontrado :("
          description="Infelizmente não conseguimos localizar os detalhes deste dragão."
          actionLabel="Voltar para a lista"
          icon="🔍"
          onAction={() => navigate("/dragoes")}
          />
        </main>
      </div>
    );
  }
  const historias = Array.isArray(dragon.histories)
    ? dragon.histories
    : dragon.histories
    ? [dragon.histories]
    : [];

  return (
    <div>
      <Header />

      <main className="container">
        <section className="register-card">

          <div className="register-card-tittle">
            <Button
              type="button"
              className="btn--return"
              onClick={() => navigate("/dragoes")}
            >
              <span className="btn--return__arrow">&larr;</span>
            </Button>

            <h1>Detalhes do Dragão</h1>
          </div>

          <div className="field">
            <label>Nome do Dragão</label>
            <span>{dragon.name}</span>
          </div>

          <div className="field">
            <label>Tipo</label>
            <span>{dragon.type}</span>
          </div>

          <div className="field">
            <label>Data de Cadastro</label>
            <span>
              {new Date(dragon.createdAt).toLocaleString("pt-BR")}
            </span>
          </div>
          
          <div className="field">
            <label>Histórias</label>
        </div>
        
        {historias.length > 0 ? (
            <ul className="history-list">
                {historias.map((h, i) => (
                    <li key={i}><span>{h}</span></li>
                    ))}
                    </ul>
                    ) : (
                    <span>Este dragão ainda não possui histórias.</span>
                    )}
        </section>
      </main>
    </div>
  );
}

export default DetailsPage;