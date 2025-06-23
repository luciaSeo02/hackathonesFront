import { useState, useEffect, useRef } from 'react';
import { Filter, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import FilterModal from './FilterModal';
import SearchBar from './ui/SearchBar';
import Button from './ui/Button';

const HackathonFilters = ({ onChange }) => {
    const [filters, setFilters] = useState({
        search: '',
        topic: '',
        modality: '',
        startDate: '',
        endDate: '',
        technologies: '',
    });

    const [topics, setTopics] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_URL_API}/lists/topics`);
                const json = await res.json();
                setTopics(json.data || []);
            } catch (err) {
                console.error('Error al cargar temáticas', err);
            }
        };
        fetchTopics();
    }, []);

    const updateFilters = (updated) => {
        setFilters(updated);
        onChange(updated);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFilters({ ...filters, [name]: value });
    };

    const handleSearchChange = (value) => {
        updateFilters({ ...filters, search: value });
    };

    const handleChipClick = (topicName) => {
        updateFilters({
            ...filters,
            topic: topicName === filters.topic ? '' : topicName,
        });
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
        updateFilters(emptyFilters);
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
    };

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
                <div className="relative w-full sm:w-[150px]">
                    <select
                        name="modality"
                        value={filters.modality}
                        onChange={handleChange}
                        className="appearance-none bg-transparent text-xs sm:text-sm font-medium text-gray-800 border-indigo-500 border-[2px] px-4 py-3 rounded-sm sm:rounded-lg w-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Modalidad</option>
                        <option value="online">Online</option>
                        <option value="onsite">Presencial</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>

                <input
                    type="text"
                    name="technologies"
                    placeholder="Tecnologías (JavaScript, SQL...)"
                    value={filters.technologies}
                    onChange={handleChange}
                    className="w-full sm:w-[280px] px-4 py-3 rounded-sm sm:rounded-lg border-[2px] text-xs sm:text-sm font-medium text-gray-800 bg-transparent border-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-500"
                />

                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    className="w-full sm:w-[160px] px-4 py-3 rounded-sm sm:rounded-lg border-[2px] text-xs sm:text-sm font-medium text-gray-800 bg-transparent border-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    className="w-full sm:w-[160px] px-4 py-3 rounded-sm sm:rounded-lg border-[2px] text-xs sm:text-sm font-medium text-gray-800 bg-transparent border-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center gap-4">
            
            <div className="w-full max-w-5xl px-4">
                <SearchBar
                    value={filters.search}
                    onChange={handleSearchChange}
                    placeholder="Buscar hackathons..."
                />
            </div>

            
            <div className="w-full max-w-5xl flex items-center justify-between px-4 gap-2">
                <button
                    onClick={handleToggleFilters}
                    className="flex items-center gap-2 p-2 rounded-full border-[2px] border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                    title={showAdvancedFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
                >
                    <Filter size={15} />
                    <span className="hidden sm:inline text-xs">Filtros</span>
                </button>
            
                <button
                    onClick={clearFilters}
                    className="text-xs sm:text-sm border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                >
                Limpiar filtros
                </button>
            </div>

            
            <div className="w-full max-w-5xl px-4 relative">
                <button
                    onClick={scrollLeft}
                    className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 z-10"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto no-scrollbar space-x-3 px-2 py-2 scroll-smooth sm:px-8"
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        scrollSnapType: 'x mandatory',
                    }}
                >
                    {topics.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => handleChipClick(t.name)}
                            className={`whitespace-nowrap px-4 py-[6px] rounded-sm sm:px-4 sm:py-2 sm:rounded-lg border text-xs sm:text-sm font-medium scroll-snap-align-start ${
                                filters.topic === t.name
                                    ? 'bg-light-gradient dark:bg-dark-gradient text-white border-transparent'
                                    : 'bg-transparent text-gray-800 border-[2px] border-indigo-500 hover:bg-indigo-50'
                            }`}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 z-10"
                >
                    <ChevronRight className="w-5 h-5" />
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