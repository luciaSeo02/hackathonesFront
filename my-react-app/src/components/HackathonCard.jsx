import { useState } from "react";
import Button from './ui/Button';
import inscriptionService from "../services/inscriptionService";

const HackathonCard = ({ hackathon, onShowDetails }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleDetailsClick = () => {
        onShowDetails(hackathon.id);
    };

    const handleInscription = async () => {
        try {
            await inscriptionService(hackathon.id);
            setMessage("¡Inscripción realizada con éxito!");
        } catch (error) {
            setMessage(error.message || "Error al inscribirse");
        } finally {
            setShowPopup(false);
        }
    };

    const fallbackDescription =
        'Participa en este emocionante hackathon donde podrás aplicar tus conocimientos en programación, IA, videojuegos y más. ¡No te lo pierdas!';

    const imageUrl = hackathon.image
        ? `${import.meta.env.VITE_URL_API}/uploads/${hackathon.image}`
        : '/defaultHackathonImage.png';

    return (
        <li className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden shadow-xl group mx-auto font-display">
            <img
                src={imageUrl}
                alt={hackathon.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 z-5"></div>

            <span className="absolute top-4 left-4 z-6 bg-white/80 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wide shadow-sm">
                {hackathon.topic || 'Sin categoría'}
            </span>

            <div className="absolute bottom-4 left-4 right-4 z-6 bg-white bg-opacity-90 rounded-xl px-4 py-3 flex flex-col gap-1 shadow-md">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                    {hackathon.name}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">
                    {hackathon.description || fallbackDescription}
                </p>

                <div className="mt-2 self-end flex gap-2">
                    <button
                        onClick={handleDetailsClick}
                        className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] rounded-sm md:px-4 md:py-2 md:rounded-lg text-white text-xs md:text-sm"
                    >
                        Más info
                    </button>
                    <button
                        onClick={() => setShowPopup(true)}
                        className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] rounded-sm md:px-4 md:py-2 md:rounded-lg text-white text-xs md:text-sm"
                    >
                        Inscribirme
                    </button>
                </div>
                {message && (
                    <p className="text-green-600 text-xs mt-2">{message}</p>
                )}
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                        <p className="mb-4 font-semibold text-gray-800">
                            ¿Seguro que quieres inscribirte en este hackathon?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleInscription}
                                className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] rounded-sm md:px-4 md:py-2 md:rounded-lg text-white text-xs md:text-sm"
                            >
                                Sí, inscribirme
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

export default HackathonCard;