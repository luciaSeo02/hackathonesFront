const HackathonDescriptionInput = ({ value, onChange }) => {
    return (
        <div className="relative">
            <textarea
                name="description"
                placeholder="Descripción del evento"
                value={value}
                onChange={onChange}
                required
                rows={3}
                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
            />
        </div>
    );
}

export default HackathonDescriptionInput;