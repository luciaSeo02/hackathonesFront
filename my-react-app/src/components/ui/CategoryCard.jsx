import { ArrowUpRight } from 'lucide-react';

const CategoryCard = ({ name, description }) => {
    return (
        <article>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="bg-light-gradient dark:bg-dark-gradient">
                <ArrowUpRight size={20} />
            </div>
        </article>
    );
};

export default CategoryCard;
