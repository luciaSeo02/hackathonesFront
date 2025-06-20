import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';

import HackathonsList from '../components/HackathonsList';
import HackathonFilters from '../components/HackathonFilters';
import Button from '../components/ui/Button';

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
                <h2 className="text-2xl font-bold">Lista de Hackathones</h2>

                {userLogged?.role === 'admin' && (
                    <Button
                        text="Crear hackathon"
                        onClick={handleCreateClick}
                    />
                )}
            </div>

            <HackathonFilters onChange={handleFiltersChange} />
            <HackathonsList searchParams={searchParams} />
        </div>
    );
};

export default HackathonsPage;
