import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import SearchBar from '../components/ui/SearchBar.jsx';
import Button from '../components/ui/Button.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import { useContext } from 'react';
import AuthContext from '../context/AuthContextProvider.jsx';

const MenuPage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    {/* Obtengo ruta previa */}
    const from = location.state?.from || '/';

    const handleClose = () => {
        navigate(from, { replace: true });
    };

    const handleSearch = (query) => {
        if (query) {
            navigate(`/hackathons=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#a7a7a7] z-50 flex flex-col">
            
            {/* Header */}
            <header className="flex justify-between items-center px-2 pt-2">
                <NavLink
                    to="/"
                    className="font-bold text-lg hover:opacity-80 transition"
                    onClick={handleClose}
                >
                    <img className="h-5" src="./logo2.png" alt="Logo HackNMeet" />
                </NavLink>
                <X
                    onClick={handleClose}
                    width="25"
                    height="25"
                    fill="none"
                    stroke="#5F3DC4"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    style={{ cursor: 'pointer' }}
                />
            </header>

            {/* Menú central */}
            <menu className="flex flex-col items-center flex-1 justify-center pt-20 gap-2">
                <NavLink
                    to={'/hackathons'}
                    onClick={handleClose}
                    className="text-white"
                >
                    Hackathones
                </NavLink>
                <NavLink
                    to={'/about'}
                    onClick={handleClose}
                    className="text-white"
                >
                    Sobre Hackathones
                </NavLink>
                <NavLink
                    to={'/contact'}
                    onClick={handleClose}
                    className="text-white"
                >
                    Contacto
                </NavLink>
                <NavLink
                    to={'/terms'}
                    onClick={handleClose}
                    className="text-white"
                >
                    Términos y Condiciones
                </NavLink>
                <NavLink
                    to={'/privacy'}
                    onClick={handleClose}
                    className="text-white"
                >
                    Política de Privacidad
                </NavLink>

                {/* SearchBar */}
                <div className="w-70 mt-8">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Botones */}
                {!token ? (
                    <div className="flex justify-center gap-3 mt-8">
                        <NavLink to={'/login'} onClick={handleClose}>
                            <Button text="Iniciar sesión" />
                        </NavLink>
                        <NavLink to={'/register'} onClick={handleClose}>
                            <Button text="Registrarse" />
                        </NavLink>
                    </div>
                ) : (
                    <NavLink to={'/profile'} onClick={handleClose}>
                        <Avatar />
                    </NavLink>
                )}
            </menu>

            {/* Redes sociales */}
            <div className="w-full flex flex-col items-center mb-4 mt-8 pt-14">
                <hr className="w-11/12 border-gray-300 mb-3" />
                <div className="flex gap-3">
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visita nuestro perfil en Instagram"
                    >
                        <FaInstagram size={20} className="text-[#5F3DC4]" />
                    </a>
                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visita nuestro perfil en Facebook"
                    >
                        <FaFacebookF size={20} className="text-[#5F3DC4]" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visita nuestro perfil en LinkedIn"
                    >
                        <FaLinkedinIn size={20} className="text-[#5F3DC4]" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
