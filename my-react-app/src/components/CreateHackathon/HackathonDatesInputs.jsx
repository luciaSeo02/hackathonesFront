import { Calendar } from 'lucide-react';

const HackathonDatesInputs = ({ startDate, endDate, onChange }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="size-[18px] text-blue-600" />
                </div>
                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={onChange}
                    required
                    className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="size-[18px] text-blue-600" />
                </div>
                <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={onChange}
                    required
                    className="bg-neutral-100 size-full px-3 py-3 pl-11 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                />
            </div>
        </div>
    );
}

export default HackathonDatesInputs;