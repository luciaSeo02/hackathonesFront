import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, UserRoundPlus, X } from 'lucide-react';
import registerUserService from '../services/registerUserService.js';
import ButtonBig from './ui/ButtonBig';
import ErrorDiv from './ui/ErrorDiv';
import Success from './ui/Success';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await registerUserService({
                email,
                password,
                username,
            });
            console.log('Respuesta del servidor:', response);

            setIsRegistered(true);

            if (response.registrationCode) {
                setTimeout(() => {
                    navigate(`/users/validate/${response.registrationCode}`);
                }, 2000);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setError(
                error.message ||
                    'Error en el registro. Por favor, inténtalo de nuevo.'
            );
        }
    };

    if (isRegistered) {
        return (
            <div className="bg-white rounded-2xl p-10 shadow-2xl lg:w-[440px]">
                <div className="flex justify-center mb-8">
                    <div className="bg-green-100 size-11 p-2 rounded-md flex justify-center items-center shadow-md lg:size-16 sm:p-5 sm:rounded-lg">
                        <svg
                            className="w-5 h-5 text-green-500 sm:w-7 sm:h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-4 sm:text-4xl"></h2>
                <Success success="Por favor, verifica tu cuenta mediante el email recibido." />
                <div className="mt-6">
                    <ButtonBig
                        text="Ir al inicio de sesión"
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        );
    }

    return (
        <section className="bg-white relative p-10 rounded-2xl flex flex-col justify-center items-center gap-6 lg:w-[440px]">
            <div className="bg-neutral-100 size-11 p-2 rounded-md flex justify-center items-center shadow-md lg:size-16 sm:p-5 sm:rounded-lg">
                <UserRoundPlus className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>

            <div className="absolute top-2.5 right-2.5 lg:top-4 lg:right-4">
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
            </div>

            <article>
                <h3 className="text-center text-2xl sm:text-4xl">
                    Registrarse
                </h3>
                <p className="mt-1 text-center text-sm sm:text-base">
                    Crea una cuenta para disfrutar de <br /> nuestros servicios
                </p>
            </article>

            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center items-center gap-2"
            >
                {/* Username field */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="size-[18px] text-blue-600" />
                    </div>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Nombre de usuario"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                    />
                </div>

                {/* Email field */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="size-[18px] text-blue-600" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo electrónico"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                    />
                </div>

                {/* Password field */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="size-[18px] text-blue-600" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                        {showPassword ? (
                            <EyeOff className="size-[18px] text-blue-600" />
                        ) : (
                            <Eye className="size-[18px] text-blue-600" />
                        )}
                    </button>
                </div>

                {/* Confirm Password field */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="size-[18px] text-blue-600" />
                    </div>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Repetir contraseña"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="size-[18px] text-blue-600" />
                        ) : (
                            <Eye className="size-[18px] text-blue-600" />
                        )}
                    </button>
                </div>

                {/* Submit button */}
                <ButtonBig type="submit" text="Continuar" />

                {/* Login link */}
                <div className="my-3 flex gap-1">
                    <p>Si ya tienes una cuenta,</p>
                    <Link className="text-blue-600" to={'/login'}>
                        <p>inicia sesión</p>
                    </Link>
                </div>

                {/* Error message */}
                {error && <ErrorDiv error={error} />}
            </form>
        </section>
    );
};

export default RegisterForm;
