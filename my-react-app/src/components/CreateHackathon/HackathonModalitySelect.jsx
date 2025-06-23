import { Globe } from 'lucide-react';

const HackathonModalitySelect = ({ value, onChange }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <select
                name="modality"
                value={value}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none cursor-pointer"
            >
                <option value="">Selecciona una modalidad</option>
                <option value="online">Online</option>
                <option value="onsite">Presencial</option>
            </select>
        </div>
    );
}

export default HackathonModalitySelect;