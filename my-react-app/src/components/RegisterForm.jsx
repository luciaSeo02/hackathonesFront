import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUserService from '../services/registerUserService.js';

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

            // Si llegamos aquí, el registro fue exitoso
            setIsRegistered(true);

            // Esperar un momento antes de redirigir
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
            <div className="min-h-screen bg-gradient-to-br from-[#1565C0] to-[#9D4EDD] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-green-500"
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            ¡Registro Exitoso!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Por favor, verifica tu cuenta mediante el email
                            recibido.
                        </p>
                        <a
                            href="/login"
                            className="inline-block bg-gradient-to-r from-[#1565C0] to-[#9D4EDD] text-white font-bold py-3 px-6 rounded-2xl hover:from-[#0B3680] hover:to-[#7B2CBF] transition-all duration-300"
                        >
                            Ir al inicio de sesión
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gradient-to-br from-[#1565C0] to-[#9D4EDD] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center relative">
                            <svg
                                className="w-7 h-7"
                                fill="url(#userGradient)"
                                viewBox="0 0 24 24"
                            >
                                <defs>
                                    <linearGradient
                                        id="userGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#1565C0" />
                                        <stop
                                            offset="100%"
                                            stopColor="#9D4EDD"
                                        />
                                    </linearGradient>
                                </defs>
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#1565C0] to-[#9D4EDD] rounded-full flex items-center justify-center">
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h1
                        className="text-3xl font-black text-center text-black mb-8"
                        style={{ fontFamily: 'Orbitron' }}
                    >
                        Registrarse
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username field */}
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg
                                    className="w-5 h-5 text-[#1565C0]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Nombre de usuario"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                            />
                        </div>

                        {/* Email field */}
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg
                                    className="w-5 h-5 text-[#1565C0]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Correo electrónico"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                            />
                        </div>

                        {/* Password field */}
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg
                                    className="w-5 h-5 text-[#1565C0]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-100 rounded-2xl pl-12 pr-12 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                            >
                                <svg
                                    className="w-5 h-5 text-[#1565C0]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={
                                            showPassword
                                                ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                                                : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                        }
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Confirm Password field */}
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <svg
                                    className="w-5 h-5 text-[#1565C0]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                </svg>
                            </div>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Repetir contraseña"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full bg-gray-100 rounded-2xl pl-12 pr-12 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1565C0] focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                            >
                                <svg
                                    className="w-5 h-5 text-[#1565C0]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={
                                            showConfirmPassword
                                                ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                                                : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                        }
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#1565C0] to-[#9D4EDD] text-white font-bold py-4 rounded-2xl hover:from-[#0B3680] hover:to-[#7B2CBF] transition-all duration-300 transform hover:scale-[1.02] mt-4"
                        >
                            Continuar
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="text-center text-gray-500 mt-4">
                        Si ya tienes una cuenta,{' '}
                        <a
                            href="/login"
                            className="text-[#1565C0] hover:text-[#0B3680] transition-colors"
                        >
                            inicia sesión
                        </a>
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-2xl">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
