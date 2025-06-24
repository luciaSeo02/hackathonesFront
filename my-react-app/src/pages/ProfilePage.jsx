import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

import ChangePasswordForm from '../components/ChangePasswordForm';
import ProfileForm from '../components/ProfileForm';
import ProfileView from '../components/ProfileView';
import useProfileForm from '../hooks/useProfileForm';

import Button from '../components/ui/Button';
import ButtonBig from '../components/ui/ButtonBig';
import SectionListInscriptions from '../components/SectionListInscriptions';

const ProfilePage = () => {
    const { userLogged, setUserLogged, logout } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [formData, setFormData] = useProfileForm(userLogged);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    if (!userLogged) return <p>Cargando perfil...</p>;

    const handleSave = async () => {
        setErrorMessage('');

        const { username, email, firstName, lastName } = formData;

        if (!username.trim() || !email.trim()) {
            setErrorMessage(
                'El nombre de usuario y el correo electrónico son obligatorios.'
            );
            return;
        }

        const filteredData = {
            username: username.trim(),
            email: email.trim(),
            ...(firstName !== undefined ? { firstName: firstName.trim() } : {}),
            ...(lastName !== undefined ? { lastName: lastName.trim() } : {}),
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/users/edit`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(filteredData),
                }
            );

            const json = await response.json();
            if (!response.ok) {
                setErrorMessage(json.message || 'Error desconocido');
                return;
            }

            setUserLogged((prev) => ({ ...prev, ...filteredData }));
            setIsEditing(false);
        } catch (error) {
            setErrorMessage(error.message || 'Ocurrió un error al guardar');
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
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                }
            );

            const uploadJson = await uploadRes.json();
            if (!uploadRes.ok)
                throw new Error(
                    uploadJson.message || 'Error al subir el avatar'
                );

            const profileRes = await fetch(
                `${import.meta.env.VITE_URL_API}/users`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const profileJson = await profileRes.json();
            if (!profileRes.ok)
                throw new Error(
                    profileJson.message || 'Error al obtener perfil'
                );

            setUserLogged(profileJson.data);
            setSelectedFile(null);
            setIsEditingAvatar(false);
        } catch (error) {
            console.error('Error al subir avatar:', error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrorMessage('');
        setFormData({
            firstName: userLogged.firstName || '',
            lastName: userLogged.lastName || '',
            username: userLogged.username || '',
            email: userLogged.email || '',
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen w-full pt-6">
            <div className="w-full max-w-6xl mx-auto p-6 rounded-xl shadow-xl mt-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-8">
                        <h3 className="text-xl lg:text-3xl font-semibold">
                            Perfil del usuario
                        </h3>

                        <div className="flex flex-col items-center gap-8 w-full">
                            <div className="relative group w-40 h-40 lg:w-60 lg:h-60">
                                <img
                                    src={
                                        userLogged.avatar ||
                                        '/defaultAvatar.png'
                                    }
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover border-2 border-purple-400"
                                />
                                <button
                                    onClick={() => {
                                        setIsEditingAvatar(!isEditingAvatar);
                                        setIsEditing(false);
                                        setShowPasswordForm(false);
                                    }}
                                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition"
                                    title="Cambiar avatar"
                                >
                                    <span className="text-white text-3xl font-bold">
                                        +
                                    </span>
                                </button>
                            </div>

                            {isEditingAvatar && (
                                <form
                                    onSubmit={handleAvatarUpload}
                                    className="space-y-4 w-full max-w-xs"
                                >
                                    <div>
                                        <label
                                            htmlFor="avatar-upload"
                                            className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium text-gray-800 bg-transparent border-indigo-500 hover:bg-indigo-50"
                                        >
                                            Seleccionar archivo
                                        </label>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setSelectedFile(
                                                    e.target.files[0]
                                                )
                                            }
                                            className="hidden"
                                        />
                                    </div>

                                    {selectedFile && (
                                        <img
                                            src={URL.createObjectURL(
                                                selectedFile
                                            )}
                                            alt="Previsualización"
                                            className="w-24 h-24 rounded-full object-cover border"
                                        />
                                    )}

                                    <div className="flex gap-2 justify-center">
                                        <ButtonBig
                                            text="Subir avatar"
                                            type="submit"
                                        />
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

                            {!isEditingAvatar && (
                                <div className="w-full max-w-xl space-y-4 text-sm lg:text-lg">
                                    {isEditing ? (
                                        <ProfileForm
                                            formData={formData}
                                            setFormData={setFormData}
                                            isAdmin={
                                                userLogged.role === 'admin'
                                            }
                                        />
                                    ) : (
                                        <ProfileView user={userLogged} />
                                    )}

                                    <div className="flex gap-3 flex-wrap justify-center">
                                        {!isEditing && !showPasswordForm && (
                                            <>
                                                <Button
                                                    text="Editar perfil"
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setShowPasswordForm(
                                                            false
                                                        );
                                                    }}
                                                />
                                                <Button
                                                    text="Cambiar contraseña"
                                                    onClick={() => {
                                                        setShowPasswordForm(
                                                            true
                                                        );
                                                        setIsEditing(false);
                                                    }}
                                                />
                                            </>
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
                                                {errorMessage && (
                                                    <div className="mt-2 text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-md p-3">
                                                        {errorMessage}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {showPasswordForm && (
                                <div className="space-y-2 w-full max-w-xl">
                                    <ChangePasswordForm
                                        token={token}
                                        onSuccess={() =>
                                            setShowPasswordForm(false)
                                        }
                                    />
                                    <div className="flex justify-center">
                                        <Button
                                            text="Cancelar cambio"
                                            onClick={() =>
                                                setShowPasswordForm(false)
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-0">
                                <ButtonBig
                                    text="Cerrar sesión"
                                    onClick={handleLogout}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <SectionListInscriptions />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
