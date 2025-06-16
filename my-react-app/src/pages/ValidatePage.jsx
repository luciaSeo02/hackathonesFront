import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import validateUserService from '../services/validateUserService';
import spinnerGif from '../assets/ZKZg.gif';

const ValidatePage = () => {
    const { registrationCode } = useParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let timer;
        const validateCode = async () => {
            if (registrationCode) {
                try {
                    await validateUserService(registrationCode);
                } catch {
                    // No hacer nada, solo continuar
                }
                // Iniciar el contador siempre, sin importar el resultado
                timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            navigate('/login');
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        };
        validateCode();
        return () => clearInterval(timer);
    }, [registrationCode, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1565C0] to-[#9D4EDD]">
            <div className="text-center">
                <img
                    src={spinnerGif}
                    alt="Loading..."
                    className="w-32 h-32 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-white mb-2">
                    Validando tu cuenta
                </h2>
                <p className="text-white">
                    Serás redirigido en {countdown} segundos
                </p>
            </div>
        </div>
    );
};

export default ValidatePage;
