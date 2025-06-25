import { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from '../components/ui/Avatar.jsx';
import AuthContext from '../context/AuthContextProvider.jsx';
import { Undo2 } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const MenuDropDown = () => {
    const { userLogged, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center w-full relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex items-center justify-center
                    bg-transparent
                    lg:w-auto
                `}
                aria-label="Abrir menú de usuario"
                style={{ outline: 'none' }}
            >
                <Avatar />
                <span className="ml-2 block lg:hidden"></span>
            </button>

            {open && (
                <>
                    {/* Mobile */}
                    <div className="fixed inset-0 bg-neutral-300 z-50 flex flex-col lg:hidden">
                        <header className="flex justify-between items-center p-[18px]">
                            <NavLink to="/">
                                <img
                                    className="h-5"
                                    src="./logo2.png"
                                    alt="Logo HackNMeet"
                                />
                            </NavLink>
                            <Undo2
                                onClick={() => setOpen((prev) => !prev)}
                                width="25"
                                height="25"
                                fill="none"
                                stroke="#5F3DC4"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                style={{ cursor: 'pointer' }}
                            />
                        </header>

                        <menu className="flex flex-col items-center flex-1 justify-center gap-2">
                            <Avatar className={'w-14 h-14 mb-4'} />
                            <NavLink
                                to={'/profile'}
                                onClick={() => setOpen(false)}
                            >
                                Perfil
                            </NavLink>
                            <NavLink
                                to={'/my-inscriptions'}
                                onClick={() => setOpen(false)}
                            >
                                Mis Inscripciones
                            </NavLink>
                            {userLogged?.role === 'admin' && (
                                <NavLink
                                    to="/hackathons/classification"
                                    onClick={() => setOpen(false)}
                                >
                                    Publicar Clasificación
                                </NavLink>
                            )}
                            <NavLink
                                to="/my-classifications"
                                onClick={() => setOpen(false)}
                            >
                                Mis Clasificaciones
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className={`
                                    text-red-600
                                `}
                            >
                                <p>Cerrar sesión</p>
                            </button>
                        </menu>

                        <div className="w-full flex flex-col items-center mb-4 mt-8 pt-14">
                            <hr className="w-11/12 border-white mb-3" />
                            <div className="flex gap-3">
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visita nuestro perfil en Instagram"
                                >
                                    <FaInstagram
                                        size={20}
                                        className="text-[#5F3DC4]"
                                    />
                                </a>
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visita nuestro perfil en Facebook"
                                >
                                    <FaFacebookF
                                        size={20}
                                        className="text-[#5F3DC4]"
                                    />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visita nuestro perfil en LinkedIn"
                                >
                                    <FaLinkedinIn
                                        size={20}
                                        className="text-[#5F3DC4]"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Desktop */}
                    <div
                        className={`
                        hidden flex-col items-center mt-2 w-60 rounded-md shadow-lg z-50 mx-auto
                        bg-white
                        lg:flex lg:absolute lg:right-0 lg:mt-12 lg:w-48 lg:bg-white
                    `}
                    >
                        <NavLink
                            to="/profile"
                            className={`
                            w-60 text-center py-2 rounded-t-md transition whitespace-nowrap
                            hover:bg-[#5F3DC4]/20
                            lg:w-48 lg:hover:bg-[#5F3DC4]/20
                        `}
                            onClick={() => setOpen(false)}
                        >
                            Perfil
                        </NavLink>
                        <NavLink
                            to="/my-inscriptions"
                            className={`
                            w-60 text-center py-2 transition whitespace-nowrap
                            hover:bg-[#5F3DC4]/20
                            lg:w-48 lg:hover:bg-[#5F3DC4]/20
                        `}
                            onClick={() => setOpen(false)}
                        >
                            Mis Inscripciones
                        </NavLink>

                        {userLogged?.role === 'admin' && (
                            <NavLink
                                to="/hackathons/classification"
                                className={`
                                w-60 text-center py-2 transition whitespace-nowrap
                                hover:bg-[#5F3DC4]/20
                                lg:w-48 lg:hover:bg-[#5F3DC4]/20
                            `}
                                onClick={() => setOpen(false)}
                            >
                                Publicar Clasificación
                            </NavLink>
                        )}

                        <NavLink
                            to="/my-classifications"
                            className={`
                            w-60 text-center py-2 transition whitespace-nowrap
                            hover:bg-[#5F3DC4]/20
                            lg:w-48 lg:hover:bg-[#5F3DC4]/20
                        `}
                            onClick={() => setOpen(false)}
                        >
                            Mis Clasificaciones
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className={`
                        text-red-600 w-60 text-center py-2 rounded-b-md transition whitespace-nowrap
                        hover:bg-[#5F3DC4]/20
                        lg:w-48 lg:hover:bg-[#5F3DC4]/20
                        `}
                        >
                            <p>Cerrar sesión</p>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MenuDropDown;
