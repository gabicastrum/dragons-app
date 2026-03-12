import  './Header.css'
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/button/Button";


export function Header() {
    const { logout, logado = true } = useAuth();
    return (
        <header className="header">
                <a href="/dragoes" className="logo-titulo">
                    <h1>Dragons App</h1>
                </a>
                <div className="headerActions">
            {logado && (
                <Button type="submit" onClick={logout}>
                Sair
            </Button>
            )}
            </div>
        </header>
    )
}
