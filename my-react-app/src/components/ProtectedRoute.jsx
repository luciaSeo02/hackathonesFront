import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { userLogged } = useContext(AuthContext);

    if (userLogged === null) {
        return (
            <div className="bg-white rounded-2xl shadow p-6 m-20 text-center flex items-center justify-center">
                <p className="text-lg text-gray-600">
                    Debes{' '}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        iniciar sesión
                    </Link>{' '}
                    o{' '}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        registrarte
                    </Link>{' '}
                    para continuar.
                </p>
            </div>
        );
    }

    if (requiredRole && userLogged.role !== requiredRole) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
