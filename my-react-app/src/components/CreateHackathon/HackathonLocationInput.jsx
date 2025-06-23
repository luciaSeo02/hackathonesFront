import { MapPin } from 'lucide-react';

const HackathonLocationInput = ({ value, onChange }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <input
                type="text"
                name="location"
                placeholder="Ubicación (opcional)"
                value={value}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
        </div>
    );
}

export default HackathonLocationInput;