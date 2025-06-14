import { useState } from 'react';

import ButtonBig from './ui/ButtonBig';

const ChangePasswordForm = ({ token, onSuccess }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        const { currentPassword, newPassword, confirmNewPassword } =
            passwordData;

        if (newPassword !== confirmNewPassword) {
            setError('Las contraseñas no coinciden');
            setMessage('');
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/users/password/change`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ currentPassword, newPassword }),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                throw new Error(
                    json.message || 'Error al cambiar la contraseña'
                );
            }

            setMessage('Contraseña actualizada con éxito');
            setError('');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            });
            if (onSuccess) onSuccess();
        } catch (error) {
            setError(error.message);
            setMessage('');
        }
    };

    const inputClass =
        'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white';
    const labelClass =
        'text-sm font-medium text-gray-700 dark:text-gray-200 mb-1';

    return (
        <div className="space-y-4">
            {message && (
                <p className="text-green-600 dark:text-green-400">{message}</p>
            )}
            {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

            <div>
                <label className={labelClass}>Contraseña actual</label>
                <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                        })
                    }
                    className={inputClass}
                />
            </div>

            <div>
                <label className={labelClass}>Nueva contraseña</label>
                <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                        })
                    }
                    className={inputClass}
                />
            </div>

            <div>
                <label className={labelClass}>Confirmar nueva contraseña</label>
                <input
                    type="password"
                    value={passwordData.confirmNewPassword}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            confirmNewPassword: e.target.value,
                        })
                    }
                    className={inputClass}
                />
            </div>

            <ButtonBig text="Actualizar contraseña" onClick={handleSubmit} />
        </div>
    );
};

export default ChangePasswordForm;
