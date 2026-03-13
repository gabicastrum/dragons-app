import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { DragonForm } from "../../components/dragon-form/DragonForm";
import { buscarDragaoPorId, atualizarDragao } from "../../services/dragonService";
import { type IDragon } from "../../interfaces/dragon";

function EditPage() {
  const { id } = useParams();
  const [dragon, setDragon] = useState<IDragon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        if (!id) return;
        const data = await buscarDragaoPorId(id);
        setDragon(data);
      } catch (error) {
        console.error("Erro ao buscar dragão", error);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container">
          <section className="register-card">
            <p>Carregando dragão...</p>
          </section>
        </main>
      </div>
    );
  }

  if (!dragon) {
    return (
      <div>
        <Header />
        <main className="container">
          <section className="register-card">
            <p>Dragão não encontrado.</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container">
        <DragonForm
          titulo="Editar Dragão"
          initialData={dragon}
          onSubmit={(dados) => atualizarDragao(id!, dados)}
        />
      </main>
    </div>
  );
}

export default EditPage;