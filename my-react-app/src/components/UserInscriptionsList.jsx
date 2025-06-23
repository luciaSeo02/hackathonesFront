import deleteInscriptionService from '../services/deleteInscriptionService';
import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

import HackathonModal from './HackathonModal';
import StarRating from './StarRating';

const UserInscriptionsList = ({ inscriptions, onRemove }) => {
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [modalHackathonId, setModalHackathonId] = useState(null);
    const [imageIndex, setImageIndex] = useState({});

    const handleNext = (hackathonId, totalImages) => {
        setImageIndex((prev) => {
            const current = prev[hackathonId] ?? 0;
            return {
                ...prev,
                [hackathonId]: (current + 1) % totalImages,
            };
        });
    };

    const handlePrev = (hackathonId, totalImages) => {
        setImageIndex((prev) => {
            const current = prev[hackathonId] ?? 0;
            return {
                ...prev,
                [hackathonId]: current === 0 ? totalImages - 1 : current - 1,
            };
        });
    };

    const handleDelete = async (hackathonId) => {
        try {
            await deleteInscriptionService(hackathonId);
            setMessage('Inscripción eliminada correctamente.');
            if (onRemove) onRemove();
        } catch (error) {
            setMessage(error.message || 'Error al eliminar la inscripción');
        } finally {
            setShowPopup(false);
            setSelectedId(null);
        }
    };

    if (!inscriptions.length) {
        return <p>No has hecho ninguna inscripción.</p>;
    }

    return (
        <>
            <ul className="space-y-3">
                {inscriptions.map((insc) => {
                    const hackathon = insc.hackathon || insc;
                    const name = insc.name || hackathon?.name;
                    const description =
                        insc.description || hackathon?.description;
                    const hackathonId =
                        insc.hackathonId || hackathon?.id || insc.id;

                    const images =
                        hackathon?.attachments?.filter(
                            (att) => att.type === 'image'
                        ) || [];
                    const currentIndex = imageIndex[hackathonId] || 0;
                    const imageUrl =
                        images[currentIndex]?.url || '/hackathons.jpg';

                    return (
                        <li
                            key={hackathonId}
                            className="group relative flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 w-full sm:h-48 overflow-hidden"
                        >
                            <div className="relative w-full sm:w-1/3 aspect-video overflow-hidden rounded-xl bg-gray-200">
                                <img
                                    src={imageUrl}
                                    alt={hackathon.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                handlePrev(
                                                    hackathonId,
                                                    images.length
                                                )
                                            }
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleNext(
                                                    hackathonId,
                                                    images.length
                                                )
                                            }
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col flex-grow">
                                <button
                                    onClick={() =>
                                        setModalHackathonId(hackathonId)
                                    }
                                    className="text-xl font-semibold text-indigo-700 hover:underline text-left"
                                >
                                    {name}
                                </button>

                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {description?.slice(0, 100)}
                                    {description?.length > 100 ? '...' : ''}
                                </p>

                                <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-4">
                                    {insc.startDate && (
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="w-4 h-4 text-gray-500" />
                                            {new Date(
                                                insc.startDate
                                            ).toLocaleString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-auto flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            setShowPopup(true);
                                            setSelectedId(hackathonId);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded text-sm"
                                    >
                                        Eliminar
                                    </button>
                                    {hackathon?.endDate &&
                                        new Date(hackathon.endDate) <
                                            new Date() && (
                                            <StarRating
                                                hackathonId={hackathonId}
                                            />
                                        )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                        <p className="mb-4 font-semibold text-gray-800">
                            ¿Seguro que quieres eliminar tu inscripción?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDelete(selectedId)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >
                                Sí, eliminar
                            </button>
                            <button
                                onClick={() => {
                                    setShowPopup(false);
                                    setSelectedId(null);
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <HackathonModal
                hackathonId={modalHackathonId}
                isOpen={!!modalHackathonId}
                onClose={() => setModalHackathonId(null)}
            />
        </>
    );
};

export default UserInscriptionsList;
