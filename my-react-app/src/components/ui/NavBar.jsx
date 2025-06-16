import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import AuthContext from '../../context/AuthContextProvider.jsx';
import SearchBar from './SearchBar.jsx';
import Button from './Button.jsx';
import Avatar from './Avatar.jsx';

const NavBar = () => {
    const { token } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); 
    };

    return (
        <nav className="">
            <div className="">
                <NavLink onClick={toggleMenu}>
                    <Menu size={25} />
                </NavLink>

            {/* Menú desplegable para móviles */}
            {isMenuOpen && (
                <div className="">

                    <NavLink to={'/hackathons'} onClick={toggleMenu}>
                        <p className="py-2">Hackathones</p>
                    </NavLink>

                    <NavLink to={'/about'} onClick={toggleMenu}>
                        <p className="py-2">Sobre HackNMeet</p>
                    </NavLink>

                    <NavLink to={'/contact'} onClick={toggleMenu}>
                        <p className="py-2">Contacto</p>
                    </NavLink>

                    <SearchBar />

                {!token ? (
                    <>
                    <NavLink to={'/login'} onClick={toggleMenu}>
                        <Button text="Iniciar Sesión" />
                    </NavLink>
                    <NavLink to={'/register'} onClick={toggleMenu}>
                        <Button text="Registrarse" />
                    </NavLink>
                    </>
                ) : (
                    <NavLink to={'/profile'} onClick={toggleMenu}>
                        <Avatar />
                        </NavLink>
                        )}
                    </div>
                )}
            </div>

            {/* Menú completo para pantallas grandes */}
            <div className="hidden justify-center items-center gap-4 sm:flex">
                <menu className="px-4 flex justify-center items-center gap-8">
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

                <SearchBar />

                {!token ? (
                    <>
                        <NavLink to={'/login'}>
                            <Button text="Iniciar Sesión" />
                        </NavLink>

                        <NavLink to={'/register'}>
                            <Button text="Registrarse" />
                        </NavLink>
                    </>
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
