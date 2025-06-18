import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, LogIn, Mail } from 'lucide-react';
import ButtonBig from './ui/ButtonBig.jsx';
import AuthContext from '../context/AuthContextProvider.jsx';
import loginUserService from '../services/loginUserService.js';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { token, setToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginToken = await loginUserService({
                email,
                password,
                rememberMe,
            });
            setToken(loginToken);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return !token ? (
        <div className="bg-light-gradient dark:bg-dark-gradient w-screen h-screen p-2.5 flex justify-center items-center">
            <section className="bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-6 lg:w-[440px]">
                <div className="bg-neutral-100 size-11 p-2 rounded-md flex justify-center items-center shadow-md lg:size-16 sm:p-5 sm:rounded-lg">
                    <LogIn className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>

                <article>
                    <h3 className="text-center text-2xl sm:text-4xl">
                        Iniciar Sesión
                    </h3>
                    <p className="mt-1 text-center text-sm sm:text-base">
                        Ingresa tus datos personales para <br /> disfrutar de
                        nuestros servicios
                    </p>
                </article>

                <form
                    className="w-full flex flex-col justify-center items-center gap-2"
                    onSubmit={handleSubmit}
                >
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="size-[18px] text-blue-600" />
                        </div>

                        <input
                            className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="size-[18px] text-blue-600" />
                        </div>

                        <input
                            className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Link className="w-full px-1 flex justify-end items-center gap-2">
                        <p>Recuperar contraseña</p>
                    </Link>

                    <div className="w-full px-1 flex justify-start items-center gap-2">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <p>Recuérdame</p>
                    </div>

                    <ButtonBig type="submit" text="Continuar" />

                    <div className="my-3 flex gap-1">
                        <p>Si no tienes cuenta,</p>
                        <Link className="text-blue-600" to={'/register'}>
                            <p>regístrate</p>
                        </Link>
                    </div>
                </form>

                {error ? <p>{error}</p> : null}
            </section>
        </div>
    ) : (
        <p>Ya has iniciado sesión</p>
    );
};
export default LoginForm;
