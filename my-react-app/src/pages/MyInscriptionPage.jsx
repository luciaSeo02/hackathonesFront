import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContextProvider';
import getUserInscriptionsService from '../services/getUserInscriptionsService';
import UserInscriptionsList from '../components/UserInscriptionsList';

const MyInscriptionsPage = () => {
    const { userLogged } = useContext(AuthContext);
    const [inscriptions, setInscriptions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const now = new Date();

    const applyFilter = (list, type) => {
        if (type === 'current') {
            return list.filter((insc) => {
                const end = new Date(
                    insc.endDate || insc.hackathon?.endDate || insc.startDate
                );
                return end >= now;
            });
        }
        if (type === 'past') {
            return list.filter((insc) => {
                const end = new Date(
                    insc.endDate || insc.hackathon?.endDate || insc.startDate
                );
                return end < now;
            });
        }
        return list;
    };

    const fetchInscriptions = async () => {
        setLoading(true);
        try {
            const data = await getUserInscriptionsService();
            setInscriptions(data);
            setFiltered(applyFilter(data, filter));
        } catch {
            setInscriptions([]);
            setFiltered([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userLogged) return;
        fetchInscriptions();
    }, [userLogged]);

    useEffect(() => {
        setFiltered(applyFilter(inscriptions, filter));
    }, [filter, inscriptions]);

    return (
        <div className="flex-1 flex items-start justify-center w-full px-4 pt-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl px-4 py-6 w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Todas mis inscripciones
                </h1>

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
                    <UserInscriptionsList
                        inscriptions={filtered}
                        onRemove={fetchInscriptions}
                    />
                )}
            </div>
        </div>
    );
};

export default MyInscriptionsPage;
