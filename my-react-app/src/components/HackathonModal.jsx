import { useEffect, useState } from 'react';
import Button from './ui/Button';
import CloseX from './ui/CloseX.jsx';
import Success from './ui/Success';
import ErrorDiv from './ui/ErrorDiv';

import inscriptionService from '../services/inscriptionService';

const HackathonModal = ({ hackathonId, isOpen, onClose }) => {
    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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

    if (!isOpen) return null;

    // Imágenes
    const images = hackathon?.attachments?.filter(a => a.type === 'image' || a.fileType === 'image') || [];
    const mainImage = images[0]?.url || images[0]?.fileUrl;
    const smallImage1 = images[1]?.url || images[1]?.fileUrl;
    const smallImage2 = images[2]?.url || images[2]?.fileUrl;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-8 p-8">

                    {/* Columna de imágenes */}
                    <div className="md:w-1/2 w-full flex flex-col items-center">
                        {/* Imagen principal */}
                        <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mb-4" style={{ minHeight: 260 }}>
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={hackathon?.name}
                                    className="object-cover w-full h-full"
                                    style={{ maxHeight: 320 }}
                                />
                            ) : (
                                <span className="text-gray-400">Sin imagen</span>
                            )}
                        </div>
                        {/* Imágenes pequeñas */}
                        <div className="flex w-full gap-4">
                            <div className="w-1/2 aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                {smallImage1 ? (
                                    <img
                                        src={smallImage1}
                                        alt="Imagen secundaria 1"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-300 text-xs">Sin imagen</span>
                                )}
                            </div>
                            <div className="w-1/2 aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                {smallImage2 ? (
                                    <img
                                        src={smallImage2}
                                        alt="Imagen secundaria 2"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-300 text-xs">Sin imagen</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Columna de información */}
                    <section className="md:w-1/2 w-full flex flex-col">
                        {/* Cabecera */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-4xl mb-2">
                                    {hackathon?.name || 'Cargando...'}
                                </h2>
                                <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">
                                    {hackathon?.topic || 'Sin categoría'}
                                </span>
                            </div>
                            <CloseX onClick={onClose} size={24} />
                        </div>

                        {/* Contenido */}
                        {loading && (
                            <div className="text-center py-8">
                                <p className="text-gray-600 dark:text-gray-300">Cargando detalles...</p>
                            </div>
                        )}

                        {error && (
                            <div className="text-center py-8">
                                <p className="text-red-600">Error: {error}</p>
                            </div>
                        )}

                        {hackathon && !loading && (
                            <div className="space-y-6">
                                {/* Descripcion */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Descripción
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {hackathon.description}
                                    </p>
                                </div>

                                {/* Detalle */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                Modalidad
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {hackathon.modality === 'online' ? 'Online' :
                                                    hackathon.modality === 'onsite' ? 'Presencial' :
                                                        hackathon.modality}
                                            </p>
                                        </div>
                                        {hackathon.location && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    Ubicación
                                                </h4>
                                                <p>
                                                    {hackathon.location}
                                                </p>
                                            </div>
                                        )}
                                        {hackathon.onlineUrl && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    URL del evento
                                                </h4>
                                                <a
                                                    href={hackathon.onlineUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 break-all"
                                                >
                                                    {hackathon.onlineUrl}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                Fecha de inicio
                                            </h4>
                                            <p>
                                                {formatDate(hackathon.startDate)}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                Fecha de fin
                                            </h4>
                                            <p>
                                                {formatDate(hackathon.endDate)}
                                            </p>
                                        </div>
                                        {hackathon.technolyNames && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    Tecnologías
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {hackathon.technolyNames.split(',').map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full"
                                                        >
                                                            {tech.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        onClick={() => setShowPopup(true)}
                                        text="Inscribirme"
                                    />
                                    <Button
                                            text="Editar"
                                    />
                                </div>

                                {/* Popup inscripción */}
                                {showPopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                                        <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                                            <p className="mb-4 font-semibold text-gray-800">
                                                ¿Seguro que quieres inscribirte en este hackathon?
                                            </p>
                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={handleInscription}
                                                    className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] rounded-sm md:px-4 md:py-2 md:rounded-lg text-white text-xs md:text-sm"
                                                    text="Sí, inscribirme"
                                                />
                                                <Button
                                                    onClick={() => setShowPopup(false)}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                                                    text="Cancelar"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {successMessage && (
                                    <Success success={successMessage} />
                                )}
                                {errorMessage && <ErrorDiv error={errorMessage} />}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HackathonModal;