import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HackathonCard from './HackathonCard';
import HackathonModal from './HackathonModal';

const LIMIT = 9;

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
                const now = new Date();
                const futureHackathons = (json.data || [])
                    .filter((h) => new Date(h.endDate) > now)
                    .sort(
                        (a, b) => new Date(a.startDate) - new Date(b.startDate)
                    );

                setHackathons(futureHackathons);

                setTotal(futureHackathons.length);
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

                    {/* Paginas lista */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            >
                                Anterior
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1 rounded ${
                                        page === i + 1
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}

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
