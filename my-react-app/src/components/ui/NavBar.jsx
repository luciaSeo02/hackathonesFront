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

    {
        /* Ocultar pagina de menú en la barra de navegación */
    }
    if (location.pathname === '/menu') return null;

    const handleSearch = (query) => {
        if (query) {
            navigate(`/hackathons=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="flex justify-center items-center">
            {/* Icono hamburguesa móviles/tablets */}
            <div className="lg:hidden ml-auto flex justify-center items-center">
                <button
                    onClick={() =>
                        navigate('/menu', {
                            state: { from: location.pathname },
                        })
                    }
                    className="text-[#5F3DC4] bg-transparent border-none"
                    aria-label="Abrir menú"
                >
                    <Menu size={25} />
                </button>
            </div>

            {/* Menú pantallas grandes */}
            <div className="hidden justify-center items-center gap-4 lg:flex">
                <menu className="text-white px-4 flex justify-center items-center gap-8">
                    <NavLink to={'/hackathons'}>
                        <p>Hackathones</p>
                    </NavLink>
                    <NavLink to={'/about'}>
                        <p>Sobre HackNMeet</p>
                    </NavLink>
                    <NavLink to={'/contact'}>
                        <p>Contacto</p>
                    </NavLink>
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
