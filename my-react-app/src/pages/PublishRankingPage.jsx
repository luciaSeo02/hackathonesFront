import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import Button from '../components/ui/Button';

const PublishClassificationPage = () => {
    const { hackathonId } = useParams();
    const navigate = useNavigate();
    const { userLogged } = useContext(AuthContext);
    const [hackathon, setHackathon] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [myHackathons, setMyHackathons] = useState([]);
    const formRef = useRef(null);

    useEffect(() => {
        if (userLogged) {
            fetch(`${import.meta.env.VITE_URL_API}/hackathons`)
                .then((res) => res.json())
                .then((data) => {
                    const now = new Date();
                    const hackathonsDone = (data.data || []).filter(
                        (h) => new Date(h.endDate) < now
                    );
                    setMyHackathons(hackathonsDone);
                });
        }
    }, [userLogged]);

    useEffect(() => {
        if (hackathonId) {
            fetch(`${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}`)
                .then((res) => res.json())
                .then((data) => setHackathon(data.data));
            fetch(
                `${
                    import.meta.env.VITE_URL_API
                }/hackathons/${hackathonId}/participants`
            )
                .then((res) => res.json())
                .then((data) => setParticipants(data.data));
        }
    }, [hackathonId]);

    if (!userLogged) return <p>Debes iniciar sesión.</p>;

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h3 className="text-2xl font-bold mt-10 mb-6 text-center">
                Tus Hackathones Creados
            </h3>
            <div className="grid gap-4 mb-8">
                {myHackathons.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                        No has creado ningún hackathon.
                    </div>
                )}
                {myHackathons
                    .slice()
                    .sort(
                        (a, b) => new Date(a.startDate) - new Date(b.startDate)
                    )
                    .map((h) => (
                        <div
                            key={h.id}
                            className={`bg-white rounded-xl shadow-md p-5 flex flex-col gap-2 transition border-2 ${
                                h.id === hackathonId
                                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                                    : 'border-transparent hover:border-indigo-300'
                            }`}
                        >
                            <div>
                                <h3 className="font-semibold text-lg text-indigo-700">
                                    {h.name}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {h.topic || 'Sin categoría'}
                                </p>
                                <Button
                                    className="mt-5"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(
                                            `/hackathons/${h.id}/classification`
                                        );
                                        setTimeout(() => {
                                            formRef.current?.scrollIntoView({
                                                behavior: 'smooth',
                                            });
                                        }, 100);
                                    }}
                                    text="Publicar clasificación"
                                />
                            </div>
                            <span className="text-xs text-gray-400 self-end">
                                {new Date(h.startDate).toLocaleDateString()} -{' '}
                                {new Date(h.endDate).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PublishClassificationPage;
