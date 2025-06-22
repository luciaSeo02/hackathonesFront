import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, RectangleEllipsis } from 'lucide-react';
import ButtonBig from '../components/ui/ButtonBig.jsx';
import { changeRecoverPasswordService } from '../services/changeRecoverPasswordService.js';

const ChangePasswordPage = () => {
    const [email, setEmail] = useState('');
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [resp, setResp] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmail('');
        setRecoverPassCode('');
        setNewPassword('');
        setNewPasswordRepeat('');
        setError('');
        setResp('');

        if (newPassword !== newPasswordRepeat) {
            setError('Las contraseñas deben ser iguales');
            return;
        }

        try {
            const data = await changeRecoverPasswordService({
                email,
                recoverPassCode,
                newPassword,
            });
            setResp(data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-light-gradient dark:bg-dark-gradient w-screen h-screen p-2.5 flex justify-center items-center">
            <section className="bg-white p-10 rounded-2xl flex flex-col justify-center items-center gap-6 lg:w-[440px]">
                <article>
                    <h3 className="text-center text-2xl sm:text-4xl">
                        Cambiar Contraseña
                    </h3>
                    <p className="mt-1 text-center text-sm sm:text-base">
                        Ingresa tus datos personales para <br /> disfrutar de
                        nuestros servicios
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

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <RectangleEllipsis className="size-[18px] text-blue-600" />
                        </div>

                        <input
                            className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                            type="text"
                            name="recoverPassCode"
                            placeholder="Código de recuperación"
                            onChange={(e) => setRecoverPassCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="size-[18px] text-blue-600" />
                        </div>

                        <input
                            className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            placeholder="Contraseña"
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />

                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            onClick={() =>
                                setShowNewPassword(!showNewPassword)
                            }
                        >
                            {showNewPassword ? (
                                <EyeOff className="size-[18px] text-blue-600" />
                            ) : (
                                <Eye className="size-[18px] text-blue-600" />
                            )}
                        </button>
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="size-[18px] text-blue-600" />
                        </div>

                        <input
                            className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg"
                            type={showNewConfirmPassword ? 'text' : 'password'}
                            name="newPasswordRepeat"
                            placeholder="Contraseña"
                            onChange={(e) => setNewPasswordRepeat(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            onClick={() => setShowNewConfirmPassword(!showNewConfirmPassword)}
                        >
                            {showNewConfirmPassword ? (
                                <EyeOff className="size-[18px] text-blue-600" />
                            ) : (
                                <Eye className="size-[18px] text-blue-600" />
                            )}
                        </button>
                    </div>

                    <ButtonBig type="submit" text="Confirmar" />
                </form>

                {error ? <p>{error}</p> : null}
                {resp ? <p>{resp}</p> : null}
            </section>
        </div>
    );
};

export default ChangePasswordPage;
