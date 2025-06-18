import { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AuthContext from '../../context/AuthContextProvider.jsx';
import SearchBar from './SearchBar.jsx';
import Button from './Button.jsx';
import Avatar from './Avatar.jsx';

const NavBar = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    {/* Ocultar pagina de menú en la barra de navegación */}
    if (location.pathname === '/menu') return null;

    const handleSearch = (query) => {
        if (query) {
            navigate(`/hackathons=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="flex items-center relative px-4 py-2 bg-[#a7a7a7] rounded-lg">

            {/* Icono hamburguesa móviles/tablets */}
            <div className="lg:hidden ml-auto">
                <button
                    onClick={() => navigate('/menu', { state: { from: location.pathname } })}
                    className="text-[#5F3DC4] bg-transparent border-none"
                    aria-label="Abrir menú"
                >
                    <Menu size={25} />
                </button>
            </div>

            {/* Menú pantallas grandes */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
                <menu className="flex items-center gap-4">
                    <NavLink to={'/hackathons'}>Hackathones</NavLink>
                    <NavLink to={'/about'}>Sobre HackNMeet</NavLink>
                    <NavLink to={'/contact'}>Contacto</NavLink>
                </menu>
                <SearchBar onSearch={handleSearch} />
                {!token ? (
                    <div className="flex gap-4">
                        <NavLink to={'/login'}>
                            <Button text="Iniciar Sesión" />
                        </NavLink>
                        <NavLink to={'/register'}>
                            <Button text="Registrarse" />
                        </NavLink>
                    </div>
                ) : (
                    <NavLink to={'/profile'}>
                        <Avatar />
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
