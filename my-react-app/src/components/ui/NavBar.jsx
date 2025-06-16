import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AuthContext from '../../context/AuthContextProvider.jsx';
import SearchBar from './SearchBar.jsx';
import Button from './Button.jsx';
import Avatar from './Avatar.jsx';

const NavBar = () => {
    const { token } = useContext(AuthContext);

    return (
        <nav className="flex justify-center items-center">
            <div className="flex sm:hidden">
                <NavLink>
                    <Menu size={25} />
                </NavLink>
            </div>

            <div className="hidden justify-center items-center gap-4 sm:flex">
                <menu className="text-white px-4 flex justify-center items-center gap-8">
                    <NavLink>
                        <p>Hackathones</p>
                    </NavLink>
                    <NavLink>
                        <p>Sobre HackNMeet</p>
                    </NavLink>
                    <NavLink>
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
