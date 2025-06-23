import { Code } from 'lucide-react';

const HackathonTechnologiesInput = ({ value, onChange }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Code className="size-[18px] text-blue-600" />
            </div>
            <input
                type="text"
                name="technologyNames"
                placeholder="Tecnologías (separadas por coma)"
                value={value}
                onChange={onChange}
                className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
            />
        </div>
    );
}

export default HackathonTechnologiesInput;