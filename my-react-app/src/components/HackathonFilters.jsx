import { useState, useEffect } from 'react';
import { Filter, ChevronDown, FunnelX } from 'lucide-react';
import FilterModal from './FilterModal';

const HackathonFilters = ({ filters, onChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...localFilters, [name]: value };
        setLocalFilters(updated);
        const { ...filtersOnly } = updated;
        onChange(filtersOnly);
    };

    const clearFilters = () => {
        
        const emptyFilters = {
            search: '',
            topic: '',
            modality: '',
            startDate: '',
            endDate: '',
            technologies: '',
        };
        setLocalFilters({
            ...localFilters,
            ...emptyFilters,
        });
        setLocalFilters(emptyFilters);
        onChange(emptyFilters);
    };

    const [showModal, setShowModal] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const handleToggleFilters = () => {
        if (window.innerWidth < 640) {
            setShowModal(true);
        } else {
            setShowAdvancedFilters((prev) => !prev);
        }
    };

    const AdvancedFilters = (
        <div className="w-full flex justify-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">
                {/* Temática */}
                <div className="relative w-full sm:w-[170px]">
                    <select
                        name="topic"
                        value={localFilters.topic || ''}
                        onChange={handleChange}
                        className="appearance-none bg-transparent text-xs sm:text-sm font-medium text-gray-800 border-indigo-500 border-[2px] px-4 py-3 rounded-sm sm:rounded-lg w-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value=""> Temática </option>
                        <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                        <option value="Desarrollador de Software">Desarrollador de Software</option>
                        <option value="Desarrollo Web"> Desarrollo Web </option>
                        <option value="Data Science"> Data Science </option>
                        <option value="Ciberseguridad"> Ciberseguridad </option>
                        <option value="Realidad Virtual">Realidad Virtual</option>
                        <option value="Robótica"> Robótica </option>
                        <option value="Hardware"> Hardware </option>
                        <option value="Gaming"> Gaming </option>
                        <option value="LAN Parties"> LAN Parties </option>
                    </select>
                    <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={20}
                    />
                </div>
                {/* Modalidad */}
                <div className="relative w-full sm:w-[150px]">
                    <select
                        name="modality"
                        value={localFilters.modality || ''}
                        onChange={handleChange}
                        className="appearance-none bg-transparent text-xs sm:text-sm font-medium text-gray-800 border-indigo-500 border-[2px] px-4 py-3 rounded-sm sm:rounded-lg w-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Modalidad</option>
                        <option value="online">Online</option>
                        <option value="onsite">Presencial</option>
                    </select>
                    <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={20}
                    />
                </div>
                {/* Tecnologías */}
                <div className="relative w-full sm:w-[150px]">
                    <select
                        name="technologies"
                        value={localFilters.technologies|| ''}
                        onChange={handleChange}
                        className="appearance-none bg-transparent text-xs sm:text-sm font-medium text-gray-800 border-indigo-500 border-[2px] px-4 py-3 rounded-sm sm:rounded-lg w-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Tecnología</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C#">C#</option>
                        <option value="C++">C++</option>
                        <option value="SQL">SQL</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="React">React</option>
                        <option value="Node.js">Node.js</option>
                        <option value="Express">Express</option>
                        <option value="MongoDB">MongoDB</option>
                        <option value="PostgreSQL">PostgreSQL</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Angular">Angular</option>
                        <option value="Vue.js">Vue.js</option>
                    </select>
                    <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={20}
                    />
                </div>
                
                {/* Fechas */}
                <input
                    type="date"
                    name="startDate"
                    value={localFilters.startDate || ''}
                    onChange={handleChange}
                    className="w-full sm:w-[160px] px-4 py-3 rounded-sm sm:rounded-lg border-[2px] text-xs sm:text-sm font-medium text-gray-800 bg-transparent border-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="date"
                    name="endDate"
                    value={localFilters.endDate || ''}
                    onChange={handleChange}
                    className="w-full sm:w-[160px] px-4 py-3 rounded-sm sm:rounded-lg border-[2px] text-xs sm:text-sm font-medium text-gray-800 bg-transparent border-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div className="max-w-5xl flex items-center justify-between mb-6 gap-2">
                <button
                    onClick={handleToggleFilters}
                    className="flex items-center gap-2 p-2 rounded-full border-[2px] border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                    title={
                        showAdvancedFilters
                            ? 'Ocultar filtros'
                            : 'Mostrar filtros'
                    }
                >
                    <Filter size={15} />
                    <span className="hidden sm:inline text-xs">Filtros</span>
                </button>
                <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 p-2 rounded-full border-[2px] border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                >
                    <FunnelX size={15} />
                    <span className="hidden sm:inline text-xs">
                        Limpiar filtros
                    </span>
                </button>
            </div>
            {showAdvancedFilters && (
                <div className="w-full max-w-5xl px-4">{AdvancedFilters}</div>
            )}
            <FilterModal isOpen={showModal} onClose={() => setShowModal(false)}>
                {AdvancedFilters}
            </FilterModal>
        </div>
    );
};

export default HackathonFilters;
