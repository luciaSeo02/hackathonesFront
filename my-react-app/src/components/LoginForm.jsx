import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, LogIn, Mail, X } from 'lucide-react';
import ButtonBig from './ui/ButtonBig.jsx';
import AuthContext from '../context/AuthContextProvider.jsx';
import loginUserService from '../services/loginUserService.js';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { token, setToken } = useContext(AuthContext);

    const from = location.state?.from || '/';

    useEffect(() => {
        setError('');
        setSuccess('');
    }, []);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token]);

    const handleClose = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginToken = await loginUserService({
                email,
                password,
                rememberMe,
            });
            setToken(loginToken);
            setSuccess('Inicio de sesión exitoso');
            setError('');
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
            setSuccess('');
        }
    };

    return (
        <div className="bg-light-gradient dark:bg-dark-gradient w-screen h-screen p-2.5 flex justify-center items-center">
            <section className="bg-white relative p-10 rounded-2xl flex flex-col justify-center items-center gap-6 lg:w-[440px]">
                <div className="bg-neutral-100 size-11 p-2 rounded-md flex justify-center items-center shadow-md lg:size-16 sm:p-5 sm:rounded-lg">
                    <LogIn className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>

                <div className="absolute top-2.5 right-2.5 lg:top-4 lg:right-4">
                    <X
                        onClick={handleClose}
                        width="25"
                        height="25"
                        stroke="#5F3DC4"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <article>
                    <h3 className="text-center text-2xl sm:text-4xl">
                        Iniciar Sesión
                    </h3>
                    <p className="mt-1 text-center text-sm sm:text-base">
                        Ingresa tus datos personales para <br /> disfrutar de nuestros servicios
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
                            value={email}
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
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="size-[18px] text-blue-600" />
                            ) : (
                                <Eye className="size-[18px] text-blue-600" />
                            )}
                        </button>
                    </div>

                    <Link to={'/password/recover'} className="w-full px-1 flex justify-end">
                        <p>Recuperar contraseña</p>
                    </Link>

                    <div className="w-full px-1 flex justify-start items-center gap-2 ">
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

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-600 text-sm text-center">{success}</p>}
                </form>
            </section>
        </div>
    );
};

export default LoginForm;
