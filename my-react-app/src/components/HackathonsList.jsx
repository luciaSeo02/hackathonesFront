import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HackathonCard from './HackathonCard';
import HackathonModal from './HackathonModal';

const HackathonsList = ({ searchParams, redirectIfEmpty = false }) => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedHackathonId, setSelectedHackathonId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHackathons = async () => {
            setLoading(true);
            try {
                const queryString = searchParams
                    ? `?${searchParams.toString()}`
                    : '';
                const res = await fetch(
                    `${import.meta.env.VITE_URL_API}/hackathons${queryString}`
                );
                const json = await res.json();

                if (!res.ok)
                    throw new Error(
                        json.message || 'Error al cargar los hackathones'
                    );

                const now = new Date();
                const futureHackathons = (json.data || [])
                    .filter((h) => new Date(h.endDate) > now)
                    .sort(
                        (a, b) => new Date(a.startDate) - new Date(b.startDate)
                    );

                setHackathons(futureHackathons);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHackathons();
    }, [searchParams, redirectIfEmpty, navigate]);

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
            {hackathons.length === 0 ? (
                <p className="text-center text-gray-600 mt-10">
                    No se encontraron hackathones con los filtros aplicados.
                </p>
            ) : (
                <>
                    <ul className="mx-2.5 grid gap-6 sm:grid-cols-2 lg:mx-10 lg:mt-10 lg:grid-cols-3">
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
                </>
            )}
        </div>
    );
};

export default HackathonsList;
