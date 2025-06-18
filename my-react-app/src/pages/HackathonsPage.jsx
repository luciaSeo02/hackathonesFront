import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';

import HackathonsList from '../components/HackathonsList';
import Button from '../components/ui/Button';

const HackathonsPage = () => {
    const { userLogged } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/hackathons/create');
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Lista de Hackathones</h2>

                {userLogged?.role === 'admin' && (
                    <Button
                        text="Crear hackathon"
                        onClick={handleCreateClick}
                    />
                )}
            </div>

            <HackathonsList />
        </div>
    );
};

export default HackathonsPage;
