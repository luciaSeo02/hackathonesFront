import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
    return (
        <div className="relative">
            <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    1024: {
                        slidesPerView: 'auto',
                        spaceBetween: 40,
                    },
                }}
                className="w-full"
            >
                {hackathons.map((hackathon) => (
                    <SwiperSlide key={hackathon.id}>
                        <HackathonCard
                            title={hackathon.title}
                            description={hackathon.description}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HackathonCarousel;
