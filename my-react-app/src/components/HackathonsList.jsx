import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HackathonCard from './HackathonCard';
import HackathonModal from './HackathonModal';
import Pagination from './ui/Pagination';
import spinnerGif from '../assets/ZKZg.gif';

const LIMIT = 12;

const HackathonsList = ({ searchParams, redirectIfEmpty = false }) => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedHackathonId, setSelectedHackathonId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHackathons = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams(searchParams);
                params.set('limit', LIMIT);
                params.set('page', page);
                params.set('activeOnly', 'true');

                const res = await fetch(
                    `${
                        import.meta.env.VITE_URL_API
                    }/hackathons?${params.toString()}`
                );
                const json = await res.json();

                if (!res.ok)
                    throw new Error(
                        json.message || 'Error al cargar los hackathones'
                    );

                setHackathons(json.data || []);
                setTotal(json.total || 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHackathons();
    }, [searchParams, redirectIfEmpty, navigate, page]);

    const handleShowDetails = (hackathonId) => {
        setSelectedHackathonId(hackathonId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedHackathonId(null);
    };

    const totalPages = Math.ceil(total / LIMIT);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (loading)
        return (
            <div className="text-center">
                <img
                    src={spinnerGif}
                    alt="Loading..."
                    className="w-32 h-32 mx-auto mb-4"
                />
            </div>
        );
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

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />

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
