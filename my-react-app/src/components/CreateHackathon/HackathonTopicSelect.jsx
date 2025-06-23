import { Tag } from 'lucide-react';

const HackathonTopicSelect = ({ value, onChange, topics }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-blue-500" />
            </div>
            <select
                name="topicName"
                value={value}
                onChange={onChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
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