import { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import AuthContext from '../context/AuthContextProvider';
import getUserInscriptionsService from '../services/getUserInscriptionsService';
import UserInscriptionsList from '../components/UserInscriptionsList';
import Pagination from '../components/ui/Pagination';

const LIMIT = 6;

const MyInscriptionsPage = () => {
    const { userLogged } = useContext(AuthContext);
    const [inscriptions, setInscriptions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const now = useMemo(() => new Date(), []);

    const applyFilter = useCallback(
        (list, type) => {
            if (type === 'current') {
                return list.filter((insc) => {
                    const end = new Date(
                        insc.endDate ||
                            insc.hackathon?.endDate ||
                            insc.startDate
                    );
                    return end >= now;
                });
            }
            if (type === 'past') {
                return list.filter((insc) => {
                    const end = new Date(
                        insc.endDate ||
                            insc.hackathon?.endDate ||
                            insc.startDate
                    );
                    return end < now;
                });
            }
            return list;
        },
        [now]
    );

    const fetchInscriptions = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getUserInscriptionsService(LIMIT, page);
            setInscriptions(data.inscriptions);
            setTotal(data.total);
            setFiltered(applyFilter(data.inscriptions, filter));
        } catch {
            setInscriptions([]);
            setFiltered([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [page, filter, applyFilter]);

    useEffect(() => {
        if (!userLogged) return;
        fetchInscriptions();
    }, [userLogged, fetchInscriptions]);

    useEffect(() => {
        setFiltered(applyFilter(inscriptions, filter));
    }, [filter, inscriptions, applyFilter]);

    const totalPages = Math.ceil(total / LIMIT);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="flex-1 flex items-start justify-center w-full px-4 pt-8">
            <div className="bg-white rounded-3xl shadow-2xl px-4 py-6 w-full max-w-3xl mx-auto">
                <h3 className="mb-6">Todas mis inscripciones</h3>

                <div className="mb-6 flex gap-4">
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium  ${
                            filter === 'all'
                                ? 'bg-light-gradient dark:bg-dark-gradient text-white border-transparent'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium  ${
                            filter === 'current'
                                ? 'bg-light-gradient dark:bg-dark-gradient text-white border-transparent'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => setFilter('current')}
                    >
                        Actuales
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            filter === 'past'
                                ? 'bg-light-gradient dark:bg-dark-gradient text-white border-transparent'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => setFilter('past')}
                    >
                        Pasadas
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-500">Cargando inscripciones...</p>
                ) : (
                    <>
                        <UserInscriptionsList
                            inscriptions={filtered}
                            onRemove={fetchInscriptions}
                        />

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default MyInscriptionsPage;
