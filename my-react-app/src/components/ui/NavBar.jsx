import { useContext } from 'react';
import { NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AuthContext from '../../context/AuthContextProvider.jsx';
import SearchBar from './SearchBar.jsx';
import Button from './Button.jsx';
import MenuDropDown from '../MenuDropDown.jsx';

const NavBar = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    if (location.pathname === '/menu') return null;

    const filtersObject = Object.fromEntries([...searchParams.entries()]);

    const handleSearch = (query) => {
    const params = new URLSearchParams(filtersObject);
    if (query) {
        params.set('search', query);
    } else {
        params.delete('search');
    }
    navigate(`/hackathons?${params.toString()}`);
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
                <menu className="px-4 flex justify-center items-center gap-8">
                    <NavLink
                        to={'/hackathons'}
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-light-gradient dark:bg-dark-gradient bg-clip-text text-transparent'
                                : 'null'
                        }
                    >
                        <p>Hackathones</p>
                    </NavLink>
                    <NavLink
                        to={'/about'}
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-light-gradient dark:bg-dark-gradient bg-clip-text text-transparent'
                                : 'null'
                        }
                    >
                        <p>Sobre HackNMeet</p>
                    </NavLink>
                    <NavLink
                        to={'/contact'}
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-light-gradient dark:bg-dark-gradient bg-clip-text text-transparent'
                                : 'null'
                        }
                    >
                        <p>Contacto</p>
                    </NavLink>
                </menu>

                <SearchBar
                    initialValue={filtersObject.search || ''}
                    filters={filtersObject}
                    onSearch={handleSearch}
                />

                {!token ? (
                    <div className="flex gap-4">
                        <NavLink to={'/login'}>
                            <Button text="Iniciar Sesión" className="w-32" />
                        </NavLink>
                        <NavLink to={'/register'}>
                            <Button text="Registrarse" className="w-32" />
                        </NavLink>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center">
                        <MenuDropDown />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
