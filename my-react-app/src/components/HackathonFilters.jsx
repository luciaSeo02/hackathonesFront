import { useState } from 'react';

const HackathonFilters = ({ onChange }) => {
    const [filters, setFilters] = useState({
        topic: '',
        modality: '',
        startDate: '',
        endDate: '',
        technologies: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        onChange(updatedFilters);
    };

    return (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
            <input
                name="topic"
                placeholder="Temática"
                onChange={handleChange}
                className="input"
            />
            <select name="modality" onChange={handleChange} className="input">
                <option value="">Modalidad</option>
                <option value="online">Online</option>
                <option value="onsite">Presencial</option>
            </select>
            <input
                name="technologies"
                placeholder="Tecnologías (JavaScript, Inteligencia Artificial...)"
                onChange={handleChange}
                className="input"
            />
            <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="input"
            />
            <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="input"
            />
        </div>
    );
};

export default HackathonFilters;
