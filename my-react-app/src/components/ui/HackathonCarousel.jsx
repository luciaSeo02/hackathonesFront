import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HackathonCard = ({ title, description, isActive, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/hackathon/${title}`);
    };

    return (
        <article
            onClick={onClick}
            className={`cursor-pointer transition-all duration-300 ${
                isActive
                    ? 'relative z-10 scale-100 opacity-100'
                    : 'scale-95 opacity-50 blur-sm'
            } text-white bg-[url('/defaultHackathonImage.png')] bg-cover bg-center min-w-[238px] h-[270px] p-4 rounded-xl flex flex-col justify-end items-start lg:min-w-[440px] lg:h-[500px] lg:p-6 lg:rounded-2xl`}
        >
            <h3 className="text-xl font-bold lg:text-3xl">{title}</h3>
            <p className="pr-4 mt-2 text-sm lg:text-base lg:pr-6">
                {description}
            </p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
                className="bg-light-gradient dark:bg-dark-gradient absolute top-4 right-4 size-9 rounded-md flex justify-center items-center lg:top-6 lg:right-6 lg:size-11"
            >
                <ArrowUpRight className="lg:size-8" color="#fff" />
            </button>
        </article>
    );
};

const HackathonCarousel = ({ hackathons = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative">
            <div className="relative">
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-8 px-2.5 lg:gap-5 lg:px-10">
                    {hackathons.map((hackathon, index) => (
                        <HackathonCard
                            key={hackathon.id}
                            title={hackathon.title}
                            description={hackathon.description}
                            isActive={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Indicadores de navegación */}
            <div className="flex justify-center gap-2 mt-4">
                {hackathons.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeIndex
                                ? 'bg-purple-600 w-8'
                                : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HackathonCarousel;
