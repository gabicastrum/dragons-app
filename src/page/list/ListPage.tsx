import { Header } from "../../components/header/Header";
import { DragonCard } from '../../components/dragon-card/DragonCard';
import { type IDragon } from '../../interfaces/dragon';
import  { listarDragoes, deletarDragao } from "../../services/dragonService";
import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import "./ListPage.css"
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../components/confirm-modal/ConfirmModal";


function ListPage() {
  const [dragoes, setDragoes] = useState<IDragon[]>([]);
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);
  const [toast, setToast] = useState<{ tipo: "success" | "error"; message: string } | null>(null);
  const navigate = useNavigate();
  
  const handleViewDetails = (id: string) => {
    navigate(`/dragoes/${id}`)
  }
  
  const handleEdit = (id: string) => {
    navigate(`/dragoes/${id}/editar`)
  };

  const showToast = (tipo: "success" | "error", message: string) => {
    setToast({ tipo, message });
    setTimeout(() => setToast(null), 2000);
  };

  const handleDelete = async () => {
    if (!idParaDeletar) return;
    try {
      await deletarDragao(idParaDeletar);
      setDragoes((prev) => prev.filter((d) => d.id !== idParaDeletar));
      showToast("success", "Dragão deletado com sucesso!");
    } catch {
      showToast("error", "Erro ao deletar o dragão. Tente novamente.");
    } finally {
      setIdParaDeletar(null);
    }
  };

  useEffect(() => {
    async function carregarDragoes() {
      const data = await listarDragoes();
      const ordenados = data.sort((a: IDragon, b: IDragon) => 
        a.name.localeCompare(b.name)
    );
    setDragoes(ordenados);
  }
  carregarDragoes();
}, []);

  return (
    <div>
      {toast && (
        <div className={`toast toast-${toast.tipo}`}>
          {toast.message}
        </div>
      )}
      <Header />
      <main className="container">
        <div className="list-header">
          <div className="list-tittle">
            <h1>Lista de Dragões</h1>
          </div>
        </div>
        <div className="btn-register-container">
          <Button className="btn-register" onClick={() => navigate("/cadastro")}>Cadastre aqui o seu dragão</Button>
        </div>
       <section className="cardSection">
          {dragoes.map((dragao) => (
            <DragonCard
              key={dragao.id}
              dragon={dragao}
              onEdit={handleEdit}
              onDelete={(id) => setIdParaDeletar(id)}
              onViewDetails={handleViewDetails}
            />
          ))}
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
  );
}

export default ListPage;