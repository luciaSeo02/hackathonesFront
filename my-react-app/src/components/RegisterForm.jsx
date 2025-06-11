import { useState } from "react";
import registerUserService from "../services/registerUserService.js";


const RegisterForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const resp = await registerUserService({ email, password, username });

            setResp(resp);


        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Registrarse</h3>
            <div>
                <label htmlFor="username">Nombre de usuario</label>
            <input type="text" name="username" id="username" required onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="confirmPassword">Repetir contraseña</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div>
                <button>Continuar</button>
            </div>

            {resp.status == 'ok' ? <p>{resp.message}</p> : ''} 

            {error ? <p>{error}</p> : null}
    
        </form>
    )
};

export default RegisterForm;
