import { Globe } from 'lucide-react';

const HackathonModalitySelect = ({ value, onChange }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="size-[18px] text-blue-600" />
            </div>
            <select
                name="modality"
                value={value}
                onChange={onChange}
                className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all appearance-none cursor-pointer"
            >
                <option value="">Selecciona una modalidad</option>
                <option value="online">Online</option>
                <option value="onsite">Presencial</option>
            </select>
        </div>
    );
}

export default HackathonModalitySelect;