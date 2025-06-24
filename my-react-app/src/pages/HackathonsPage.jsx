import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';

import HackathonsList from '../components/HackathonsList';
import HackathonFilters from '../components/HackathonFilters';
import { Plus } from 'lucide-react';

const HackathonsPage = () => {
    const { userLogged } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Convierte los searchParams a objeto para los filtros y la búsqueda
    const filtersObject = Object.fromEntries([...searchParams.entries()]);

    // Cuando cambian los filtros avanzados
    const handleFiltersChange = (filters) => {
    const newParams = new URLSearchParams();
    // Solo añade search si tiene valor
    if (filters.search) newParams.set('search', filters.search);
    Object.entries(filters).forEach(([key, value]) => {
        if (key !== 'search' && value) newParams.set(key, value);
    });
    setSearchParams(newParams);
};

    const handleCreateClick = () => {
        navigate('/hackathons/create');
    };

    return (
        <div className="p-4 lg:mt-8">
            <div className="mb-6 text-center px-10">
                <h2>Nuestros Hackathones</h2>
                
                
                {userLogged?.role === 'admin' && (
                    <button
                        onClick={handleCreateClick}
                        className="fixed top-28 right-6 z-50 bg-light-gradient hover:bg-indigo-700 text-white p-4 rounded-full"
                        title="Crear nuevo hackathon"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                )}
            </div>
            <HackathonFilters
                filters={filtersObject}
                onChange={handleFiltersChange}
            />
            <HackathonsList
                searchParams={searchParams}
                redirectIfEmpty={false}
            />
        </div>
    );
};

export default HackathonsPage;
