import { useEffect, useState } from 'react';
import Button from './ui/Button';

const HackathonModal = ({ hackathonId, isOpen, onClose }) => {
    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && hackathonId) {
            fetchHackathonDetails();
        }
    }, [isOpen, hackathonId]);

    const fetchHackathonDetails = async () => {
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}`
            );

            console.log(response);
            
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
            day: 'numeric'
        });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">

                    {/* Cabecera */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">
                                {hackathon?.topic || 'Sin categoría'}
                            </span>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                {hackathon?.name || 'Cargando...'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold"
                        >
                            ×
                        </button>
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
                                            <p className="text-gray-600 dark:text-gray-300">
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
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {formatDate(hackathon.startDate)}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            Fecha de fin
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300">
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
                                    text="Cerrar" 
                                    onClick={onClose}
                                    className="bg-gray-500 hover:bg-gray-600"
                                />
                                {hackathon.onlineUrl && (
                                    <Button 
                                        text="Ir al evento" 
                                        onClick={() => window.open(hackathon.onlineUrl, '_blank')}
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HackathonModal;