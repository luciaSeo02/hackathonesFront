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
            <div className="lg:hidden text-white">
                <NavLink>
                    <Menu size={25} />
                </NavLink>
            </div>

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
