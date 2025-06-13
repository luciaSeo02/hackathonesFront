import { createContext, useEffect, useState } from 'react';
import getDataUserLoggedService from '../services/getDataUserLoggedService.js';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            getDataUserLogged(token);
        } else {
            localStorage.removeItem('token');
            setUserLogged(null);
        }
    }, [token]);

    const getDataUserLogged = async (authToken) => {
        try {
            const data = await getDataUserLoggedService(authToken);
            setUserLogged(data);
        } catch (error) {
            console.log(error);
            setToken(null);
        }
    };

    const logout = () => {
        setToken(null);
        setUserLogged(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, userLogged, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export { AuthContextProvider };
