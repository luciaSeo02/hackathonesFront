import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import Button from '../components/ui/Button';

const UserHackathonClassifications = () => {
    const { userLogged } = useContext(AuthContext);
    const [myHackathons, setMyHackathons] = useState([]);
    const [hackathon, setHackathon] = useState(null);
    const [classification, setClassification] = useState([]);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userLogged) {
            fetch(`${import.meta.env.VITE_URL_API}/inscriptions`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('INSCRIPTIONS RESPONSE:', data);
                    setMyHackathons(data.inscriptions || []);
                });
        }
    }, [userLogged]);

    const handleViewClassification = (h) => {
        setLoading(true);
        setHackathon(h);
        fetch(
            `${import.meta.env.VITE_URL_API}/hackathons/${
                h.hackathonId
            }/classification/view`
        )
            .then((res) => res.json())
            .then((data) => {
                setClassification(data.classification || []);
                setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            })
            .finally(() => setLoading(false));
    };

    if (!userLogged) return <p>Debes iniciar sesión.</p>;

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Hackathones en los que participas
            </h1>
            <div className="grid gap-4 mb-8">
                {myHackathons.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                        No has participado en ningún hackathon.
                    </div>
                )}
                {myHackathons.map((h) => (
                    <div
                        key={h.id}
                        className={`cursor-pointer bg-white rounded-xl shadow-md p-5 flex flex-col gap-2 transition border-2 ${
                            hackathon && h.hackathonId === hackathon.hackathonId
                                ? 'border-indigo-500 ring-2 ring-indigo-200'
                                : 'border-transparent hover:border-indigo-300'
                        }`}
                        onClick={() => handleViewClassification(h)}
                    >
                        <div>
                            <h3 className="font-semibold text-lg text-indigo-700">
                                {h.name}
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                {h.topic || 'Sin categoría'}
                            </p>
                            <Button
                                className="mt-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(
                                        `/hackathons/${h.id}/classification/view`
                                    );
                                }}
                                text="Ver Clasificación"
                            />
                        </div>
                        <span className="text-xs text-gray-400 self-end">
                            {new Date(h.startDate).toLocaleDateString()} -{' '}
                            {new Date(h.endDate).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>

            {hackathon && (
                <div ref={formRef}>
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Clasificación de:{' '}
                        <span className="text-indigo-700">
                            {hackathon.name}
                        </span>
                    </h2>
                    {loading ? (
                        <p className="text-center">Cargando clasificación...</p>
                    ) : classification.length === 0 ? (
                        <p className="text-center text-gray-500">
                            Aún no hay clasificación publicada.
                        </p>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">
                                        Posición
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        Usuario
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {classification.map((row, i) => (
                                    <tr key={i}>
                                        <td className="py-2 px-4 border-b">
                                            {row.position}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {row.username}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {row.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserHackathonClassifications;
