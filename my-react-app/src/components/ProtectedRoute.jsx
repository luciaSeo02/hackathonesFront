import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { userLogged } = useContext(AuthContext);

    if (userLogged === null) {
        return <div className="text-center p-8 text-gray-500">Cargando...</div>;
    }

    if (requiredRole && userLogged.role !== requiredRole) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
