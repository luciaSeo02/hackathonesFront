import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CategoryCard = ({ name, description, cover }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const topicParam = encodeURIComponent(name);
        navigate(`/hackathons?topic=${topicParam}`);
    };

    return (
        <div
            className="relative w-full h-full cursor-pointer group"
            onClick={handleClick}
        >
            {/* Imagen principal con gradiente */}
            {cover?.endsWith('.mp4') ? (
                <video
                    src={cover}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                />
            ) : (
                <img
                    src={cover || '/topics.jpg'}
                    alt={name}
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                />
            )}

            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 rounded-xl md:rounded-2xl" />

            {/* Contenido */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 lg:p-6 z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:transform group-hover:-translate-y-1 transition-transform">
                    {name}
                </h3>
                <p className="text-white/90 text-sm md:text-base line-clamp-2 group-hover:transform group-hover:-translate-y-1 transition-transform">
                    {description}
                </p>
            </div>

            {/* Botón de acción */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                className="absolute top-3 right-3 md:top-4 md:right-4 size-8 md:size-10 bg-white/10 backdrop-blur-sm rounded-lg flex justify-center items-center z-20 transition-transform group-hover:scale-110"
            >
                <ArrowUpRight className="size-5 md:size-6 text-white" />
            </button>
        </div>
    );
};

export default CategoryCard;
