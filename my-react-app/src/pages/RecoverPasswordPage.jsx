import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, X } from 'lucide-react';
import ButtonBig from '../components/ui/ButtonBig.jsx';
import recoverPassService from '../services/recoverPassService.js';

const RecoverPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResp('');

        try {
            const recoverPass = await recoverPassService(email);
            setEmail(recoverPass);
            navigate('/password/change');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="bg-white relative p-10 rounded-2xl flex flex-col justify-center items-center gap-6 lg:w-[440px]">
            <div className="absolute top-2.5 right-2.5 lg:top-4 lg:right-4">
                <X
                    onClick={handleClose}
                    width="25"
                    height="25"
                    stroke="#5F3DC4"
                    strokeWidth="2"
                    style={{ cursor: 'pointer' }}
                />
            </div>

            <article>
                <h3 className="text-center text-2xl sm:text-4xl">
                    Recuperar Contraseña
                </h3>
                <p className="mt-1 text-center text-sm sm:text-base">
                    Ingresa tu correo electrónico para <br /> enviarte el código
                    de recuperación
                </p>
            </article>

            <form
                className="w-full flex flex-col justify-center items-center gap-2"
                onSubmit={handleSubmit}
            >
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="size-[18px] text-blue-600" />
                    </div>

                    <input
                        className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <ButtonBig type="submit" text="Enviar" />
            </form>

            {error ? <p>{error}</p> : null}
            {resp ? <p>{resp}</p> : null}
        </section>
    );
};

export default RecoverPasswordPage;
