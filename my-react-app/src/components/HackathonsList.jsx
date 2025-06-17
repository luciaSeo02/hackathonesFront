import { useEffect, useState } from 'react';
import HackathonCard from './HackathonCard';
import HackathonModal from './HackathonModal';

const HackathonsList = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedHackathonId, setSelectedHackathonId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_URL_API}/hackathons`
                );
                const json = await res.json();

                if (!res.ok) {
                    throw new Error(
                        json.message || 'Error al cargar los hackathones'
                    );
                }

                setHackathons(json.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHackathons();
    }, []);

    const handleShowDetails = (hackathonId) => {
        setSelectedHackathonId(hackathonId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHackathonId(null);
    };

    if (loading) return <p>Cargando hackathones...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lista de Hackathones</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hackathons.map((hackathon) => (
                    <HackathonCard 
                        key={hackathon.id} 
                        hackathon={hackathon}
                        onShowDetails={handleShowDetails}
                    />
                ))}
            </ul>

            <HackathonModal
                hackathonId={selectedHackathonId}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default HackathonsList;