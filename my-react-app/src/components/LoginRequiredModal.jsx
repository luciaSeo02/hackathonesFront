import { Link } from 'react-router-dom';
import CloseX from './ui/CloseX';

const LoginRequiredModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-xl shadow-xl w-80 text-center">
                <div className="absolute top-3 right-3">
                    <CloseX onClick={onClose} size={28} />
                </div>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Inicia sesión
                </h2>

                <p className="text-sm text-gray-600 mb-2 px-2 leading-relaxed">
                    Debes{' '}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        iniciar sesión
                    </Link>{' '}
                    o{' '}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        registrarte
                    </Link>{' '}
                    para poder acceder a más información.
                </p>
            </div>
        </div>
    );
};

export default LoginRequiredModal;
