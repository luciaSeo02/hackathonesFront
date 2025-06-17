import useTopics from '../hooks/useTopics.jsx';
import CategoryCard from './ui/CategoryCard.jsx';

const CategoryList = () => {
    const topics = useTopics();

    return (
        <ul className="m-2.5 flex gap-2.5 overflow-x-auto no-scrollbar lg:m-10 lg:gap-5">
            {topics &&
                topics?.map((topic) => (
                    <CategoryCard
                        key={topic.id}
                        name={topic.name}
                        description={topic.description}
                        cover={topic.cover}
                    />
                ))}
        </ul>
    );
};

export default CategoryList;
