import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import getUserInscriptionsService from '../services/getUserInscriptionsService';
import UserInscriptionsList from './UserInscriptionsList';
import Button from './ui/Button';

const SectionListInscriptions = () => {
    const { userLogged } = useContext(AuthContext);
    const navigate = useNavigate();

    const [inscriptions, setInscriptions] = useState([]);
    const [loadingInscriptions, setLoadingInscriptions] = useState(true);

    const now = new Date();

    const fetchInscriptions = async () => {
        setLoadingInscriptions(true);
        try {
            const data = await getUserInscriptionsService(24, 1);
            setInscriptions(data.inscriptions || data);
        } catch {
            setInscriptions([]);
        } finally {
            setLoadingInscriptions(false);
        }
    };

    useEffect(() => {
        if (!userLogged) return;

        getUserInscriptionsService(24, 1)
            .then((data) => setInscriptions(data.inscriptions || data))
            .catch(() => setInscriptions([]))
            .finally(() => setLoadingInscriptions(false));
    }, [userLogged]);

    const filteredInscriptions = inscriptions
        .filter((insc) => {
            const endDate = new Date(
                insc.endDate || insc.hackathon?.endDate || insc.startDate
            );
            return endDate >= now;
        })
        .sort((a, b) => {
            const dateA = new Date(a.startDate || a.hackathon?.startDate);
            const dateB = new Date(b.startDate || b.hackathon?.startDate);
            return dateA - dateB;
        })
        .slice(0, 5);

    return (
        <section className="mt-10 p-6 bg-neutral-100 rounded-xl shadow font-body">
            <h4 className="text-black mb-4">
                Mis inscripciones
            </h4>
            {loadingInscriptions ? (
                <p className="text-gray-500">Cargando inscripciones...</p>
            ) : (
                <>
                    <UserInscriptionsList
                        inscriptions={filteredInscriptions}
                        onRemove={fetchInscriptions}
                    />

                    <div className="mt-4 text-right">
                        <Button
                            onClick={() => navigate('/my-inscriptions')}
                            text="Ver todas mis inscripciones"
                        />
                    </div>
                </>
            )}
        </section>
    );
};

export default SectionListInscriptions;
