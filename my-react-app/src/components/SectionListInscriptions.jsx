import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import getUserInscriptionsService from '../services/getUserInscriptionsService';
import getInscriptionsToMyHackathonsService from '../services/getInscriptionsToMyHackathonsService';
import UserInscriptionsList from './UserInscriptionsList';
import PeopleInscriptionsList from './PeopleInscriptionsList';

import Button from './ui/Button';

const SectionListInscriptions = () => {
    const { userLogged } = useContext(AuthContext);
    const navigate = useNavigate();

    const [inscriptions, setInscriptions] = useState([]);
    const [loadingInscriptions, setLoadingInscriptions] = useState(true);

    const [peopleInscriptions, setPeopleInscriptions] = useState([]);
    const [loadingPeople, setLoadingPeople] = useState(true);

    const now = new Date();

    const fetchInscriptions = async () => {
        setLoadingInscriptions(true);
        try {
            const data = await getUserInscriptionsService();
            setInscriptions(data);
        } catch {
            setInscriptions([]);
        } finally {
            setLoadingInscriptions(false);
        }
    };

    useEffect(() => {
        if (!userLogged) return;

        getUserInscriptionsService()
            .then(setInscriptions)
            .catch(() => setInscriptions([]))
            .finally(() => setLoadingInscriptions(false));

        if (userLogged.role === 'admin') {
            getInscriptionsToMyHackathonsService()
                .then(setPeopleInscriptions)
                .catch(() => setPeopleInscriptions([]))
                .finally(() => setLoadingPeople(false));
        } else {
            setLoadingPeople(false);
        }
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

    console.log('peopleInscriptions', peopleInscriptions);
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

            {/* {userLogged && userLogged.role === 'admin' && (
                <>
                    <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
                        {}
                        Personas inscritas a mis hackathones
                    </h2>
                    {loadingPeople ? (
                        <p className="text-gray-500">Cargando personas...</p>
                    ) : (
                        <PeopleInscriptionsList
                            inscriptions={peopleInscriptions}
                        />
                    )}
                </>
            )} */}
        </section>
    );
};

export default SectionListInscriptions;
