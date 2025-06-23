import { Calendar } from 'lucide-react';

const HackathonDatesInputs = ({ startDate, endDate, onChange }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={onChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={onChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
            </div>
        </div>
    );
}

export default HackathonDatesInputs;