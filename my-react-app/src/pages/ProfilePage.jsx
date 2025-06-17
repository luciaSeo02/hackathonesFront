import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContextProvider';

import { useNavigate } from 'react-router-dom';

import ChangePasswordForm from '../components/ChangePasswordForm';
import ProfileForm from '../components/ProfileForm';
import ProfileView from '../components/ProfileView';
import useProfileForm from '../hooks/useProfileForm';

import Button from '../components/ui/Button';
import ButtonBig from '../components/ui/ButtonBig';

const ProfilePage = () => {
    const { userLogged, setUserLogged, logout } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [formData, setFormData] = useProfileForm(userLogged);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    if (!userLogged) {
        return <p>Cargando perfil...</p>;
    }

    const handleSave = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/users/edit`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                console.error('Respuesta del backend:', json);
                throw new Error(result.message || 'Error desconocido');
            }

            setUserLogged((prev) => ({ ...prev, ...formData }));

            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar:', error.message);
        }
    };

    const handleAvatarUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            const uploadRes = await fetch(
                `${import.meta.env.VITE_URL_API}/users/avatar`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const uploadJson = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(
                    uploadJson.message || 'Error al subir el avatar'
                );
            }

            const profileRes = await fetch(
                `${import.meta.env.VITE_URL_API}/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const profileJson = await profileRes.json();

            if (!profileRes.ok) {
                throw new Error(
                    profileJson.message || 'Error al obtener perfil actualizado'
                );
            }

            setUserLogged(profileJson.data);
            setSelectedFile(null);
            setIsEditingAvatar(false);
        } catch (error) {
            console.error('Error al subir avatar:', error.message);
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

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-display">
                Perfil del usuario
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative group w-32 h-32">
                    <img
                        src={userLogged.avatar || '/defaultAvatar.png'}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover border-2 border-purple-400"
                    />

                    <button
                        onClick={() => setIsEditingAvatar((prev) => !prev)}
                        className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition"
                        title="Cambiar avatar"
                    >
                        <span className="text-white text-2xl font-bold">+</span>
                    </button>
                </div>

                {isEditingAvatar && (
                    <form
                        onSubmit={handleAvatarUpload}
                        className="mt-2 space-y-2 w-full max-w-xs"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-700 dark:text-gray-200"
                        />

                        {selectedFile && (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Previsualización"
                                className="w-24 h-24 rounded-full object-cover border mt-2"
                            />
                        )}

                        <div className="flex gap-2">
                            <ButtonBig text="Subir avatar" type="submit" />
                            <Button
                                text="Cancelar"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setIsEditingAvatar(false);
                                }}
                            />
                        </div>
                    </form>
                )}

                <div className="flex-1 space-y-4">
                    {isEditing ? (
                        <ProfileForm
                            formData={formData}
                            setFormData={setFormData}
                        />
                    ) : (
                        <ProfileView user={userLogged} />
                    )}

                    <div className="flex gap-2 flex-wrap">
                        {!isEditing && (
                            <Button
                                text="Editar perfil"
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                        {isEditing && (
                            <>
                                <ButtonBig
                                    text="Guardar"
                                    onClick={handleSave}
                                />
                                <Button
                                    text="Cancelar"
                                    onClick={handleCancel}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {!showPasswordForm ? (
                    <Button
                        text="Cambiar contraseña"
                        onClick={() => setShowPasswordForm(true)}
                    />
                ) : (
                    <div className="space-y-2">
                        <ChangePasswordForm
                            token={token}
                            onSuccess={() => setShowPasswordForm(false)}
                        />
                        <Button
                            text="Cancelar cambio"
                            onClick={() => setShowPasswordForm(false)}
                        />
                    </div>
                )}
            </div>

            <div className="mt-6">
                <ButtonBig text="Cerrar sesión" onClick={handleLogout} />
            </div>
        </div>
    );
};

export default ProfilePage;
