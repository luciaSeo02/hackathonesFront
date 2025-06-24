import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import AuthContext from '../context/AuthContextProvider';
import fetchApiAuth from "../services/Postclassification";

const PublishRankingPage = () => {
    const { hackathonId } = useParams();
    const { userLogged } = useContext(AuthContext);
    const [ranking, setRanking] = useState([{ userId: '', position: '' }]);
    const [participants, setParticipants] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}/participants`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(res => res.json())
            .then(data => setParticipants(data.data || []));
    }, [hackathonId]);

    if (!userLogged || userLogged.role !== 'admin') {
        return <p>No tienes permisos para ver esta página.</p>;
    }

    const handleChange = (i, field, value) => {
        const newRanking = [...ranking];
        newRanking[i][field] = value;
        setRanking(newRanking);
    };

    const addRow = () => setRanking([...ranking, { userId: '', position: '' }]);

    const removeRow = (index) => {
        setRanking(ranking.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rankingToSend = ranking.map((row) => ({
                userId: Number(row.userId),
                position: Number(row.position),
            }));

            await fetchApiAuth(
                `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}/classification`,
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ranking: rankingToSend }),
                }
            );
            setMessage('Clasificación publicada correctamente');
            setRanking([{ userId: '', position: '' }]);
        } catch (error) {
            setMessage(
                `Error al publicar la clasificación: ${error.message || error.toString()}`
            );
            console.error('Error al publicar la clasificación:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md relative">
                {/* Botón X para volver atrás */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                    aria-label="Volver"
                    type="button"
                >
                    <X size={28} />
                </button>
                <h2 className="text-2xl font-bold text-blue-700 mb-6">Publicar Clasificación</h2>
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    {ranking.map((row, i) => (
                        <div key={i} className="flex gap-3 items-center">
                            <select
                                className="w-1/2 px-4 py-2 rounded-md border border-gray-300"
                                value={row.userId}
                                onChange={e => handleChange(i, "userId", e.target.value)}
                                required
                            >
                                <option value="">Selecciona participante</option>
                                {participants
                                    .filter(u => !ranking.some((r, idx) => r.userId === String(u.id) && idx !== i))
                                    .map(u => (
                                        <option key={u.id} value={String(u.id)}>
                                            {u.username ? `${u.username} (${u.email})` : u.email}
                                        </option>
                                    ))}
                            </select>
                            <input
                                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Posición"
                                value={row.position}
                                onChange={e => handleChange(i, "position", e.target.value)}
                                required
                                type="number"
                                min="1"
                            />
                            {ranking.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRow(i)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                                    title="Eliminar participante"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={addRow}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            disabled={ranking.length >= participants.length}
                        >
                            Añadir participante
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            Publicar
                        </button>
                    </div>
                </form>
                {message && (
                    <p className="mt-4 text-center font-bold text-green-600">{message}</p>
                )}
            </div>
        </div>
    );
};

export default PublishRankingPage;