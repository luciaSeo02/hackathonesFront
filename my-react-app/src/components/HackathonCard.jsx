import Button from './ui/Button';

const HackathonCard = ({ hackathon }) => {
    return (
        <li className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col justify-between gap-3 w-full max-w-md mx-auto">
            <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">
                {hackathon.topic || 'Sin categoría'}
            </span>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {hackathon.name}
            </h3>

            <div className="mt-2">
                <Button text="Más info" />
            </div>
        </li>
    );
};

export default HackathonCard;
