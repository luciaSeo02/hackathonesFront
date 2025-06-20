import useTopics from '../hooks/useTopics.jsx';
import CategoryCard from './ui/CategoryCard.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const CategoryList = () => {
    const topics = useTopics();

    if (!topics?.length) return null;

    return (
        <div className="container mx-auto px-4 mb-8">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                breakpoints={{
                    // Mobile
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    // Tablet
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    // Desktop
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                    bulletClass: 'swiper-pagination-bullet',
                }}
                modules={[EffectCoverflow, Pagination]}
                className="swiper_container"
            >
                {topics.map((topic) => (
                    <SwiperSlide key={topic.id}>
                        <CategoryCard
                            name={topic.name}
                            description={topic.description}
                            cover={topic.cover}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryList;
