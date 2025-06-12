import { createContext, useEffect, useState } from 'react';
import getDataUserLoggedService from '../services/getDataUserLoggedService.js';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        const getDataUserLogged = async () => {
            try {
                const data = await getDataUserLoggedService({ token });
                setUserLogged(data);
            } catch (error) {
                console.log(error);
            }
        };
        getDataUserLogged();
    }, [token]);

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
