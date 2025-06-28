import { useState, useContext } from 'react';
import { Star, StarOff } from 'lucide-react';
import AuthContext from '../context/AuthContextProvider';
import Button from '../components/ui/Button';
import LoginRequiredModal from './LoginRequiredModal';

const HackathonCard = ({ hackathon, onShowDetails }) => {
    const { userLogged } = useContext(AuthContext);
    const [imageIndex, setImageIndex] = useState(0);
    const [isFavourite, setIsFavourite] = useState(
        hackathon.isFavourite || false
    );
    const [showLoginModal, setShowLoginModal] = useState(false);

    const images =
        hackathon.attachments?.filter((att) => att.type === 'image') || [];

    const imageUrl = images[imageIndex]?.url || '/hackathons.jpg';

    const handleDetailsClick = () => {
        if (!userLogged) {
            setShowLoginModal(true);
            return;
        }
        onShowDetails(hackathon.id);
    };

    const handleToggleFavourite = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `${import.meta.env.VITE_URL_API}/hackathons/${
                    hackathon.id
                }/isFavourite`,
                {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            setIsFavourite((prev) => !prev);
        } catch (error) {
            alert(error.message);
        }
    };

    const fallbackDescription =
        'Participa en este emocionante hackathon donde podrás aplicar tus conocimientos en programación, IA, videojuegos y más. ¡No te lo pierdas!';

    return (
        <li className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden shadow-xl group mx-auto font-display">
            <img
                src={imageUrl}
                alt={hackathon.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 z-5"></div>

            <span className="absolute top-4 left-4 z-6 bg-white/90 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wide shadow-sm">
                {hackathon.topic || 'Sin categoría'}
            </span>

            {userLogged?.role === 'admin' && (
                <button
                    onClick={handleToggleFavourite}
                    className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-1 rounded-full shadow"
                    title={isFavourite ? 'Quitar de destacados' : 'Destacar'}
                >
                    {isFavourite ? (
                        <StarOff className="text-gray-500" />
                    ) : (
                        <Star className="text-yellow-400" />
                    )}
                </button>
            )}

            <div className="absolute bottom-4 left-4 right-4 z-6 bg-white bg-opacity-90 rounded-xl px-4 py-3 flex flex-col gap-1 shadow-md">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                    {hackathon.name}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">
                    {hackathon.description || fallbackDescription}
                </p>

                {hackathon.startDate && (
                    <p className="text-xs text-indigo-600 mt-2 font-medium">
                        Fecha inicio:{' '}
                        {new Date(hackathon.startDate).toLocaleDateString()}
                    </p>
                )}

                <div className="mt-2 self-end flex gap-2">
                    <Button
                        onClick={handleDetailsClick}
                        className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] rounded-sm md:px-4 md:py-2 md:rounded-lg text-white text-xs md:text-sm"
                        text="Más info"
                    />
                </div>
            </div>
            {showLoginModal && (
                <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
            )}
        </li>
    );
};

export default HackathonCard;
