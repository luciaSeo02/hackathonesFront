import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validateUserService from '../services/validateUserService';
import Loading from './ui/Loading';

const ValidateForm = () => {
    const [registrationCode, setRegistrationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (showSuccess && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (showSuccess && countdown === 0) {
            navigate('/login');
        }
        return () => clearTimeout(timer);
    }, [showSuccess, countdown, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await validateUserService(registrationCode);
            setShowSuccess(true);
        } catch (error) {
            alert(error.message || 'Error al validar la cuenta');
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-gradient dark:bg-dark-gradient px-4 sm:px-6 lg:px-8">
                <div className="text-center w-full max-w-lg">
                    <Loading size="large" />
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                        ¡Cuenta validada con éxito!
                    </h2>
                    <p className="text-sm sm:text-base text-white mb-4">
                        Serás redirigido al login en {countdown} segundos
                    </p>
                    <Link
                        to="/login"
                        className="text-white hover:text-gray-200 underline text-sm sm:text-base"
                    >
                        Ir al login ahora
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-light-gradient dark:bg-dark-gradient px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md p-4 sm:p-6 md:p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
                    Validar tu cuenta
                </h2>

                <form
                    className="space-y-4 sm:space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="registrationCode"
                            className="block text-sm sm:text-base font-medium text-white mb-2"
                        >
                            Código de registro
                        </label>
                        <input
                            id="registrationCode"
                            name="registrationCode"
                            type="text"
                            required
                            value={registrationCode}
                            onChange={(e) =>
                                setRegistrationCode(e.target.value)
                            }
                            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-base"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <Loading size="small" />
                                <span className="ml-2">Validando...</span>
                            </div>
                        ) : (
                            'Validar cuenta'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ValidateForm;
