import { Globe } from 'lucide-react';

const HackathonOnlineUrlInput = ({ value, onChange }) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="size-[18px] text-blue-600" />
            </div>
            <input
                type="url"
                name="onlineUrl"
                placeholder="URL del evento online"
                value={value}
                onChange={onChange}
                className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
            />
        </div>
    );
}

export default HackathonOnlineUrlInput;