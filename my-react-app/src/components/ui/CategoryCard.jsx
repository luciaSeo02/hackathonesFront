import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CategoryCard = ({ name, description, cover }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const topicParam = encodeURIComponent(name);
        navigate(`/hackathons?topic=${topicParam}`);
    };

    return (
        <article className="text-white bg-[url('/topics.jpg')] bg-cover bg-center relative min-w-[238px] h-[270px] p-4 rounded-xl flex flex-col justify-end items-start lg:min-w-[440px] lg:h-[500px] lg:p-6 lg:rounded-2xl">
            <h3>{name}</h3>
            <p className="pr-4 lg:pr-6">{description}</p>
            <button
                onClick={handleClick}
                className="bg-light-gradient dark:bg-dark-gradient absolute top-4 right-4 size-9 rounded-md flex justify-center items-center lg:top-6 lg:right-6 lg:size-11"
            >
                <ArrowUpRight className="lg:size-8" color="#fff" />
            </button>
        </article>
    );
};

export default CategoryCard;
