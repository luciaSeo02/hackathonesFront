import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider.jsx';
import loginUserService from '../services/loginUserService.js';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { token, setToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginToken = await loginUserService({ email, password, rememberMe });
            setToken(loginToken);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return !token ? (
        <section>
            <div>
                <img src="" alt="" />
            </div>

            <article>
                <h3>Iniciar Sesión</h3>
                <p>Lorem ipsum</p>
            </article>

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='Correo electrónico' onChange={e => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder='Contraseña' onChange={e => setPassword(e.target.value)} required />
                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />Recuérdame
                <p>Recuperar contraseña</p>
                <button>Continuar</button>
                <p>Si no tienes cuenta, regístrate</p>
            </form>
    
            {error ? <p>{error}</p> : null}
        </section>
    ) : (
        <p>Ya has iniciado sesión</p>
    );
};

export default LoginForm;
