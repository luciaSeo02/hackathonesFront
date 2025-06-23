const HackathonDescriptionInput = ({ value, onChange }) => {
    return (
        <div className="relative w-full">
            <textarea
                name="description"
                placeholder="Descripción del evento"
                value={value}
                onChange={onChange}
                required
                rows={3}
                className="bg-neutral-100 size-full px-4 py-3 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all resize-none"
            />
        </div>
    );
}

export default HackathonDescriptionInput;