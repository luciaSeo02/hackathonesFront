import { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from '../components/ui/Avatar.jsx';
import AuthContext from '../context/AuthContextProvider.jsx';

const MenuDropDown = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const navigate = useNavigate();
    const { logout, userLogged } = useContext(AuthContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center w-full relative" ref={ref}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex items-center justify-center
                    w-60 py-2 rounded text-white text-lg
                    mt-1 font-semibold mx-auto
                    bg-transparent
                    hover:bg-[#5F3DC4]/80
                    transition
                    lg:w-auto lg:py-0 lg:mt-0 lg:bg-transparent lg:hover:bg-[#5F3DC4]/20
                `}
                aria-label="Abrir menú de usuario"
                style={{ outline: 'none' }}
            >
                <Avatar user={userLogged} />
                <span className="ml-2 block lg:hidden">{userLogged?.name || ''}</span>
            </button>

            {open && (
                <div
                    className={`
                        flex flex-col items-center mt-2 w-60 rounded-lg shadow-lg py-2 z-50 mx-auto
                        bg-white
                        lg:absolute lg:right-0 lg:mt-12 lg:w-48 lg:bg-white lg:dark:bg-gray-800
                    `}
                >
                    <NavLink
                        to="/profile"
                        className={`
                            text-gray-800 text-lg w-60 text-center py-2 rounded transition whitespace-nowrap
                            hover:bg-[#5F3DC4]/20
                            lg:text-gray-800 lg:dark:text-white lg:w-48 lg:hover:bg-[#5F3DC4]/20 lg:dark:hover:bg-gray-700
                        `}
                        onClick={() => setOpen(false)}
                    >
                        Perfil
                    </NavLink>
                    <NavLink
                        to="/my-inscriptions"
                        className={`
                            text-gray-800 text-lg w-60 text-center py-2 rounded transition whitespace-nowrap
                            hover:bg-[#5F3DC4]/20
                            lg:text-gray-800 lg:dark:text-white lg:w-48 lg:hover:bg-[#5F3DC4]/20 lg:dark:hover:bg-gray-700
                        `}
                        onClick={() => setOpen(false)}
                    >
                        Mis inscripciones
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className={`
                            text-red-600 text-lg w-60 text-center py-2 rounded transition whitespace-nowrap
                            hover:bg-[#5F3DC4]/20
                            lg:w-48 lg:hover:bg-[#5F3DC4]/20 lg:dark:hover:bg-gray-700
                        `}
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default MenuDropDown;

