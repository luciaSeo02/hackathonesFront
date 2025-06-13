import { useState } from 'react';

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
    return (
        <div>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <p>
                <strong>Contraseña actual:</strong>{' '}
                <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                        })
                    }
                />
            </p>
            <p>
                <strong>Nueva contraseña:</strong>{' '}
                <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                        })
                    }
                />
            </p>
            <p>
                <strong>Confirmar nueva contraseña:</strong>{' '}
                <input
                    type="password"
                    value={passwordData.confirmNewPassword}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            confirmNewPassword: e.target.value,
                        })
                    }
                />
            </p>
            <button onClick={handleSubmit}>Actualizar contraseña</button>
        </div>
    );
};

export default ChangePasswordForm;
