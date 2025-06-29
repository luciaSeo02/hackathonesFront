import { useState, useEffect } from 'react';
import { Filter, ChevronDown, FunnelX } from 'lucide-react';
import FilterModal from './FilterModal';
import useAutoScroll from '../hooks/useAutoScroll';

const HackathonFilters = ({ filters, onChange, isAdmin = false }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [technologiesList, setTechnologiesList] = useState([]);
    const { scrollToTop } = useAutoScroll();

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_URL_API}/lists/technologies`
                );
                const result = await response.json();
                if (result.status === 'ok') {
                    const sorted = result.data.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setTechnologiesList(sorted);
                }
            } catch (error) {
                console.error('Error cargando tecnologías:', error);
            }
        };

        fetchTechnologies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...localFilters };

        if (name === 'sortOrder') {
            updated.orderBy = 'startDate';
            updated.orderDirection = value;
        } else {
            updated[name] = value;
        }

        setLocalFilters(updated);

        const {
            search,
            topic,
            modality,
            startDate,
            endDate,
            technologies,
            orderBy,
            orderDirection,
        } = updated;

        onChange({
            search,
            topic,
            modality,
            startDate,
            endDate,
            technologies,
            orderBy,
            orderDirection,
        });

        scrollToTop();
    };

    const clearFilters = () => {
        const emptyFilters = {
            search: '',
            topic: '',
            modality: '',
            startDate: '',
            endDate: '',
            technologies: '',
            orderBy: 'startDate',
            orderDirection: 'asc',
        };
        setLocalFilters(emptyFilters);
        onChange(emptyFilters);

        scrollToTop();
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
                        <option value="" disabled hidden>
                            Temática
                        </option>
                        <option value="Inteligencia Artificial">
                            Inteligencia Artificial
                        </option>
                        <option value="Desarrollador de Software">
                            Desarrollador de Software
                        </option>
                        <option value="Desarrollo Web">Desarrollo Web</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Ciberseguridad">Ciberseguridad</option>
                        <option value="Realidad Virtual">
                            Realidad Virtual
                        </option>
                        <option value="Robótica">Robótica</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Gaming">Gaming</option>
                        <option value="LAN Parties">LAN Parties</option>
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
                        <option value="" disabled hidden>
                            Modalidad
                        </option>
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
                        value={localFilters.technologies || ''}
                        onChange={handleChange}
                        className="appearance-none bg-transparent text-xs sm:text-sm font-medium text-gray-800 border-indigo-500 border-[2px] px-4 py-3 rounded-sm sm:rounded-lg w-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled hidden>
                            Tecnología
                        </option>
                        {technologiesList.map((tech) => (
                            <option key={tech.id} value={tech.name}>
                                {tech.name}
                            </option>
                        ))}
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

                {/* Orden por fecha */}
                <div className="relative w-full sm:w-[180px]">
                    <select
                        name="sortOrder"
                        value={
                            localFilters.orderBy === 'createdAt'
                                ? 'created-desc'
                                : localFilters.orderDirection || 'asc'
                        }
                        onChange={(e) => {
                            const value = e.target.value;
                            const updated = { ...localFilters };

                            if (value === 'created-desc') {
                                updated.orderBy = 'createdAt';
                                updated.orderDirection = 'desc';
                            } else {
                                updated.orderBy = 'startDate';
                                updated.orderDirection = value;
                            }

                            setLocalFilters(updated);
                            onChange(updated);

                            scrollToTop();
                        }}
                        className="appearance-none bg-transparent text-xs sm:text-sm font-medium text-gray-800 border-indigo-500 border-[2px] px-4 py-3 rounded-sm sm:rounded-lg w-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="asc">Más próximos</option>
                        <option value="desc">Más lejanos</option>
                        {isAdmin && (
                            <option value="created-desc">
                                Últimos creados
                            </option>
                        )}
                    </select>
                    <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={20}
                    />
                </div>
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
                <div className="w-full max-w-7xl px-4">{AdvancedFilters}</div>
            )}
            <FilterModal isOpen={showModal} onClose={() => setShowModal(false)}>
                {AdvancedFilters}
            </FilterModal>
        </div>
    );
};

export default HackathonFilters;
