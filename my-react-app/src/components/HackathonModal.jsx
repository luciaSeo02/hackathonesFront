import { useContext, useEffect, useState } from 'react';
import Button from './ui/Button';
import ButtonBig from './ui/ButtonBig';
import CloseX from './ui/CloseX.jsx';
import Success from './ui/Success';
import ErrorDiv from './ui/ErrorDiv';
import AuthContext from '../context/AuthContextProvider.jsx';
import inscriptionService from '../services/inscriptionService';

const HackathonModal = ({ hackathonId, isOpen, onClose }) => {
    const { userLogged, token } = useContext(AuthContext);

    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [showDocs, setShowDocs] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    useEffect(() => {
        if (isOpen && hackathonId) {
            fetchHackathonDetails();
        }
        // eslint-disable-next-line
    }, [isOpen, hackathonId]);

    const fetchHackathonDetails = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}`
            );
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || 'Error al cargar los detalles');
            }
            setHackathon(json.data);
            setEditData({
                name: json.data.name,
                description: json.data.description,
                modality: json.data.modality,
                location: json.data.location,
                onlineUrl: json.data.onlineUrl,
                startDate: json.data.startDate?.slice(0, 10),
                endDate: json.data.endDate?.slice(0, 10),
                topic: json.data.topic,
                technologyNames: json.data.technologyNames,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/hackathons/${hackathon.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || 'Error al eliminar el hackathon'
                );
            }

            setSuccessMessage('Hackathon eliminado exitosamente');
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setShowDeletePopup(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setSuccessMessage('');
            setErrorMessage('');
        }
    }, [isOpen]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSave = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        setErrorMessage('');
        try {
            const res = await fetch(
                `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                    body: JSON.stringify({
                        name: editData.name,
                        description: editData.description,
                        modality: editData.modality,
                        location: editData.location,
                        onlineUrl: editData.onlineUrl,
                        startDate: editData.startDate,
                        endDate: editData.endDate,
                        topicName: editData.topic,
                        technologyNames: editData.technologyNames
                            ?.split(',')
                            .map((t) => t.trim()),
                    }),
                }
            );
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Error al editar');
            setSuccessMessage('¡Hackathon editado correctamente!');
            setIsEditing(false);
            fetchHackathonDetails();
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInscription = async () => {
        setSuccessMessage('');
        setErrorMessage('');
        setShowPopup(false);
        try {
            await inscriptionService(hackathon.id);
            setSuccessMessage('¡Inscripción realizada con éxito!');
        } catch (error) {
            setErrorMessage(error.message || 'Error al inscribirse');
        }
    };

    const isAdmin = userLogged?.role === 'admin';
    const isDev = userLogged?.role === 'dev';

    if (!isAdmin && !isDev) return null;
    if (!isOpen) return null;

    // Filtrar imágenes y documentos
    const images =
        hackathon?.attachments?.filter(
            (a) => a.type === 'image' || a.fileType === 'image'
        ) || [];
    const mainImage = images[0]?.url || images[0]?.fileUrl;
    const smallImage1 = images[1]?.url || images[1]?.fileUrl;
    const smallImage2 = images[2]?.url || images[2]?.fileUrl;

    // Filtrar documentos .pdf y .doc/.docx
    const docs =
        hackathon?.attachments?.filter(
            (a) =>
                a.fileType === 'pdf' ||
                a.fileType === 'doc' ||
                a.fileType === 'docx' ||
                (a.url &&
                    (a.url.endsWith('.pdf') ||
                        a.url.endsWith('.doc') ||
                        a.url.endsWith('.docx'))) ||
                (a.fileUrl &&
                    (a.fileUrl.endsWith('.pdf') ||
                        a.fileUrl.endsWith('.doc') ||
                        a.fileUrl.endsWith('.docx')))
        ) || [];

    const MobileFullInfo = () => (
        <div className="flex flex-col gap-4 p-4 lg:hidden">
            {/* Título */}
            <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold break-words pr-14 w-full">
                    {hackathon?.name || 'Cargando...'}
                </h2>
            </div>

            {/* Descripción completa */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-3 whitespace-pre-line">
                {hackathon?.description}
            </p>

            <div className="mb-2">
                <span className="bg-indigo-50 text-indigo-700 font-semibold rounded px-3 py-1 text-xs min-w-[90px] text-center inline-block">
                    {hackathon?.topic || 'Sin categoría'}
                </span>
            </div>

            {/* Detalles */}
            <div className="space-y-2">
                <div>
                    <span className="block text-xs font-semibold text-indigo-700">
                        Modalidad:
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 text-sm">
                        {hackathon?.modality === 'online'
                            ? 'Online'
                            : hackathon?.modality === 'onsite'
                            ? 'Presencial'
                            : hackathon?.modality || 'Sin especificar'}
                    </span>
                </div>
                {hackathon?.location && (
                    <div>
                        <span className="block text-xs font-semibold text-indigo-700">
                            Ubicación:
                        </span>
                        <span className="text-gray-700 dark:text-gray-200 text-sm">
                            {hackathon.location}
                        </span>
                    </div>
                )}
                {hackathon?.onlineUrl && (
                    <div>
                        <span className="block text-xs font-semibold text-indigo-700">
                            URL del evento:
                        </span>
                        <a
                            href={hackathon.onlineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 break-all text-sm"
                        >
                            {hackathon.onlineUrl}
                        </a>
                    </div>
                )}
                <div>
                    <span className="block text-xs font-semibold text-indigo-700">
                        Fecha de inicio:
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 text-sm">
                        {formatDate(hackathon?.startDate)}
                    </span>
                </div>
                <div>
                    <span className="block text-xs font-semibold text-indigo-700">
                        Fecha de fin:
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 text-sm">
                        {formatDate(hackathon?.endDate)}
                    </span>
                </div>
                {hackathon?.technologyNames && (
                    <div>
                        <span className="block text-xs font-semibold text-indigo-700">
                            Tecnologías:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {hackathon.technologyNames
                                .split(',')
                                .map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full"
                                    >
                                        {tech.trim()}
                                    </span>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Botón para volver atrás */}
            <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2 font-semibold text-sm w-full transition"
                onClick={() => setShowFullDescription(false)}
            >
                Volver atrás
            </button>

            {/* Botón principal */}
            <ButtonBig
                onClick={() => setShowPopup(true)}
                text="Reservar hackathon"
            />
        </div>
    );

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2"
            onClick={handleOverlayClick}
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-full max-h-[98vh] overflow-y-auto shadow-2xl no-scrollbar p-0 lg:max-w-7xl lg:p-0 relative">
                <div className="absolute top-3 right-3 z-10 lg:hidden">
                    <CloseX onClick={onClose} size={32} />
                </div>

                {!showFullDescription ? (
                    <div className="flex flex-col gap-4 p-4 lg:hidden">
                        {/* Título y X */}
                        <div className="flex items-start justify-between mb-2">
                            <h2 className="text-2xl font-bold break-words pr-14 w-full">
                                {hackathon?.name || 'Cargando...'}
                            </h2>
                        </div>

                        {/* Descripción corta */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-3 line-clamp-6 min-h-[7em]">
                            {hackathon?.description}
                        </p>

                        {/* Categoría y botón de ver descripción */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <span className="bg-indigo-50 text-indigo-700 font-semibold rounded px-3 py-1 text-xs min-w-[90px] text-center">
                                {hackathon?.topic || 'Sin categoría'}
                            </span>
                            <Button
                                onClick={() => setShowFullDescription(true)}
                                text="Ver descripción"
                            />
                        </div>

                        {/* Imagen principal */}
                        <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden mb-2 min-h-[180px] max-h-[340px]">
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={hackathon?.name}
                                    className="object-cover w-full h-full max-h-[400px]"
                                />
                            ) : (
                                <span className="text-gray-400 text-lg">
                                    Sin imagen
                                </span>
                            )}
                        </div>

                        {/* Botón principal más peque */}
                        <ButtonBig
                            onClick={() => setShowPopup(true)}
                            text="Reservar hackathon"
                        />
                    </div>
                ) : (
                    <MobileFullInfo />
                )}

                {/* Escritorio */}
                <div className="hidden lg:flex flex-col gap-6 p-3 lg:flex-row lg:gap-10 lg:p-10">
                    {/* Columna de imágenes */}
                    <div className="w-full flex flex-col items-center lg:w-1/2">
                        {/* Imagen principal */}
                        <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden mb-4 min-h-[180px] max-h-[340px]">
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={hackathon?.name}
                                    className="object-cover w-full h-full max-h-[400px]"
                                />
                            ) : (
                                <span className="text-gray-400 text-lg">
                                    Sin imagen
                                </span>
                            )}
                        </div>

                        {/* Imágenes pequeñas */}
                        <div className="flex w-full gap-3">
                            <div className="w-1/2 aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                                {smallImage1 ? (
                                    <img
                                        src={smallImage1}
                                        alt="Imagen secundaria 1"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-300 text-base">
                                        Sin imagen
                                    </span>
                                )}
                            </div>
                            <div className="w-1/2 aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                                {smallImage2 ? (
                                    <img
                                        src={smallImage2}
                                        alt="Imagen secundaria 2"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-300 text-base">
                                        Sin imagen
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Línea para ver documentos */}
                        <div className="w-full mt-5">
                            <button
                                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800 transition font-semibold text-indigo-700 dark:text-indigo-200 text-base"
                                onClick={() => setShowDocs((prev) => !prev)}
                            >
                                <p>Ver documentación</p>
                                <span>{showDocs ? '▲' : '▼'}</span>
                            </button>
                            {showDocs && (
                                <div className="mt-2 space-y-2 px-1">
                                    {docs.length === 0 && (
                                        <div className="text-gray-500 text-base">
                                            No hay documentación subida.
                                        </div>
                                    )}
                                    {docs.map((doc, idx) => (
                                        <a
                                            key={idx}
                                            href={doc.url || doc.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-2 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-800 text-indigo-800 dark:text-indigo-100 transition text-sm"
                                        >
                                            {doc.name ||
                                                doc.originalName ||
                                                doc.url?.split('/').pop() ||
                                                doc.fileUrl?.split('/').pop()}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Columna de información */}
                    <section className="w-full flex flex-col lg:w-1/2">
                        {/* Cabecera */}
                        <div className="flex flex-col justify-between items-start mb-6 gap-2 lg:flex-row lg:mb-8">
                            <div className="w-full">
                                <h2 className="text-3xl mb-2 font-bold break-words lg:text-5xl lg:mb-3">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name || ''}
                                            onChange={handleEditChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        hackathon?.name || 'Cargando...'
                                    )}
                                </h2>
                                <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide lg:text-base">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="topic"
                                            value={editData.topic || ''}
                                            onChange={handleEditChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        hackathon?.topic || 'Sin categoría'
                                    )}
                                </span>
                            </div>

                            {/* CloseX para escritorio*/}
                            <div className="mt-2 lg:mt-0 hidden lg:block">
                                <CloseX onClick={onClose} size={28} />
                            </div>
                        </div>

                        {/* Contenido */}
                        {loading && (
                            <div className="text-center py-10">
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    Cargando detalles...
                                </p>
                            </div>
                        )}
                        {error && (
                            <div className="text-center py-10">
                                <p className="text-red-600 text-lg">
                                    Error: {error}
                                </p>
                            </div>
                        )}
                        {hackathon && !loading && (
                            <div className="space-y-6 lg:space-y-8">
                                {/* Descripcion */}
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base lg:text-lg mb-4 whitespace-pre-line">
                                        {hackathon.description}
                                    </p>
                                </div>

                                {/* Detalle */}
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                                    <div className="space-y-4 lg:space-y-5">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                Modalidad
                                            </h4>
                                            {isEditing ? (
                                                <select
                                                    name="modality"
                                                    value={
                                                        editData.modality || ''
                                                    }
                                                    onChange={handleEditChange}
                                                    className="border rounded px-2 py-1 w-full"
                                                >
                                                    <option value="">
                                                        Selecciona
                                                    </option>
                                                    <option value="online">
                                                        Online
                                                    </option>
                                                    <option value="onsite">
                                                        Presencial
                                                    </option>
                                                </select>
                                            ) : (
                                                <p className="text-gray-600 dark:text-gray-300 text-base">
                                                    {hackathon.modality ===
                                                    'online'
                                                        ? 'Online'
                                                        : hackathon.modality ===
                                                          'onsite'
                                                        ? 'Presencial'
                                                        : hackathon.modality}
                                                </p>
                                            )}
                                        </div>
                                        {isEditing ? (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                    Ubicación
                                                </h4>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={
                                                        editData.location || ''
                                                    }
                                                    onChange={handleEditChange}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            </div>
                                        ) : (
                                            hackathon.location && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                        Ubicación
                                                    </h4>
                                                    <p className="text-base">
                                                        {hackathon.location}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                        {isEditing ? (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                    URL del evento
                                                </h4>
                                                <input
                                                    type="text"
                                                    name="onlineUrl"
                                                    value={
                                                        editData.onlineUrl || ''
                                                    }
                                                    onChange={handleEditChange}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            </div>
                                        ) : (
                                            hackathon.onlineUrl && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                        URL del evento
                                                    </h4>
                                                    <a
                                                        href={
                                                            hackathon.onlineUrl
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 break-all text-base"
                                                    >
                                                        {hackathon.onlineUrl}
                                                    </a>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="space-y-4 lg:space-y-5">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                Fecha de inicio
                                            </h4>
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={
                                                        editData.startDate || ''
                                                    }
                                                    onChange={handleEditChange}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <p className="text-base">
                                                    {formatDate(
                                                        hackathon.startDate
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                Fecha de fin
                                            </h4>
                                            {isEditing ? (
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={
                                                        editData.endDate || ''
                                                    }
                                                    onChange={handleEditChange}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <p className="text-base">
                                                    {formatDate(
                                                        hackathon.endDate
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-base lg:text-lg">
                                                Tecnologías
                                            </h4>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="technologyNames"
                                                    value={
                                                        editData.technologyNames ||
                                                        ''
                                                    }
                                                    onChange={handleEditChange}
                                                    className="border rounded px-2 py-1 w-full"
                                                    placeholder="Separadas por coma"
                                                />
                                            ) : (
                                                hackathon.technologyNames && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {hackathon.technologyNames
                                                            .split(',')
                                                            .map(
                                                                (
                                                                    tech,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-base rounded-full"
                                                                    >
                                                                        {tech.trim()}
                                                                    </span>
                                                                )
                                                            )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex flex-col justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 lg:flex-row lg:gap-4 lg:pt-8">
                                    {!isEditing && (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    setShowPopup(true)
                                                }
                                                text="Reservar hackathon"
                                            />
                                            {isAdmin && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        text="Editar"
                                                        onClick={() =>
                                                            setIsEditing(true)
                                                        }
                                                    />
                                                    <Button
                                                        text="Eliminar"
                                                        onClick={() =>
                                                            setShowDeletePopup(
                                                                true
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {isEditing && (
                                        <>
                                            <Button
                                                text="Guardar"
                                                onClick={handleEditSave}
                                                className="bg-green-600 hover:bg-green-700"
                                            />
                                            <Button
                                                text="Cancelar"
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                                className="bg-gray-400 hover:bg-gray-500"
                                            />
                                        </>
                                    )}
                                </div>

                                {showDeletePopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                                        <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center w-[95vw] max-w-xs">
                                            <p className="mb-4 font-semibold text-gray-800 text-center">
                                                ¿Estás seguro de que deseas
                                                eliminar este hackathon? Esta
                                                acción no se puede deshacer.
                                            </p>
                                            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-center items-center">
                                                <Button
                                                    onClick={handleDelete}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                    text="Sí, eliminar"
                                                />
                                                <Button
                                                    onClick={() =>
                                                        setShowDeletePopup(
                                                            false
                                                        )
                                                    }
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                                    text="Cancelar"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Popup inscripción */}
                                {showPopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                                        <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center w-[95vw] max-w-xs">
                                            <p className="mb-4 font-semibold text-gray-800 text-center">
                                                ¿Seguro que quieres inscribirte
                                                en este hackathon?
                                            </p>
                                            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-center items-center">
                                                <Button
                                                    onClick={handleInscription}
                                                    className="bg-light-gradient dark:bg-dark-gradient px-4 py-2"
                                                    text="Sí, inscribirme"
                                                />
                                                <Button
                                                    onClick={() =>
                                                        setShowPopup(false)
                                                    }
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2"
                                                    text="Cancelar"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {successMessage && (
                                    <Success success={successMessage} />
                                )}
                                {errorMessage && (
                                    <ErrorDiv error={errorMessage} />
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HackathonModal;
