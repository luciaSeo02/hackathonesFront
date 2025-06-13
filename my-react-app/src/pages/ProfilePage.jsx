import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContextProvider';

import ChangePasswordForm from '../components/ChangePasswordForm';

const ProfilePage = () => {
    const { userLogged, setUserLogged } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    });

    useEffect(() => {
        if (userLogged) {
            setFormData({
                firstName: userLogged.firstName || '',
                lastName: userLogged.lastName || '',
                username: userLogged.username || '',
                email: userLogged.email || '',
            });
        }
    }, [userLogged]);

    if (!userLogged) {
        return <p>Cargando perfil...</p>;
    }

    const handleSave = async () => {
        const updatedData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
        };
        try {
            console.log(updatedData);

            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/users/edit`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                console.error('Respuesta del backend:', json);
                throw new Error(result.message || 'Error desconocido');
            }

            console.log('Guardado con éxito:', json);

            setUserLogged((prev) => ({
                ...prev,
                ...updatedData,
            }));

            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar:', error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            firstName: userLogged.firstName || '',
            lastName: userLogged.lastName || '',
            username: userLogged.username || '',
            email: userLogged.email || '',
        });
    };

    return (
        <div>
            <h1>Perfil del usuario</h1>

            {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                    Editar perfil
                </button>
            )}

            {!showPasswordForm && (
                <button onClick={() => setShowPasswordForm(true)}>
                    Cambiar contraseña
                </button>
            )}

            {showPasswordForm && (
                <>
                    <ChangePasswordForm
                        token={token}
                        onSuccess={() => setShowPasswordForm(false)}
                    />
                    <button onClick={() => setShowPasswordForm(false)}>
                        Cancelar
                    </button>
                </>
            )}

            <img
                src={
                    userLogged.avatar
                        ? `${import.meta.env.VITE_URL_API}/uploads/avatar/${
                              userLogged.avatar
                          }`
                        : '/defaultAvatar.png'
                }
                alt="Avatar del usuario"
                width="150"
                height="150"
            />

            <p>
                <strong>Nombre:</strong>{' '}
                {isEditing ? (
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                firstName: e.target.value,
                            })
                        }
                    />
                ) : (
                    userLogged.firstName
                )}
            </p>
            <p>
                <strong>Apellidos:</strong>{' '}
                {isEditing ? (
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                lastName: e.target.value,
                            })
                        }
                    />
                ) : (
                    userLogged.lastName
                )}
            </p>
            <p>
                <strong>Username:</strong>{' '}
                {isEditing ? (
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                    />
                ) : (
                    userLogged.username
                )}
            </p>
            <p>
                <strong>Email:</strong>{' '}
                {isEditing ? (
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                ) : (
                    userLogged.email
                )}
            </p>

            {isEditing && (
                <>
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
