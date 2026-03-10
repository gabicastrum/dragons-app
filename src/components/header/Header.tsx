import  './Header.css'
import logoImg from '../../assets/logo.jpg';

export function Header() {
    return (
        <header className="header">
            <div className="container">
            <div>
                <a href="/" className="logo-titulo">
                <img src={logoImg} alt="Logo" className="logo-img" />
                    <h1>Dragões App</h1>
                </a>
            </div>
            </div>
        </header>
    )
}
