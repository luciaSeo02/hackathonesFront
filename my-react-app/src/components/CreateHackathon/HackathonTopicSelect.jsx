import { Tag } from 'lucide-react';

const HackathonTopicSelect = ({ value, onChange, topics }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="size-[18px] text-blue-600" />
            </div>
            <select
                name="topicName"
                value={value}
                onChange={onChange}
                required
                className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
            >
                <option value="">Selecciona un tema</option>
                {topics.map((topic) => (
                    <option key={topic.id} value={topic.name}>
                        {topic.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default HackathonTopicSelect;