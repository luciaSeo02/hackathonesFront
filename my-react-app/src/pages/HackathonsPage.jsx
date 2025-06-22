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

    const handleCreateClick = () => {
        navigate('/hackathons/create');
    };

    const handleFiltersChange = (filters) => {
        const newParams = new URLSearchParams();

        Object.entries(filters).forEach(([Key, value]) => {
            if (value) newParams.set(Key, value);
        });

        setSearchParams(newParams);
    };

    return (
        <div className="p-4 md:p-8 lg:mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Nuestros Hackathones</h2>

                {userLogged?.role === 'admin' && (
                    <button
                        onClick={handleCreateClick}
                        className="fixed bottom-6 right-6 z-50 bg-light-gradient hover:bg-indigo-700 text-white p-4 rounded-full"
                        title="Crear nuevo hackathon"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                )}
            </div>

            <HackathonFilters onChange={handleFiltersChange} />
            <HackathonsList searchParams={searchParams} />
        </div>
    );
};

export default HackathonsPage;
