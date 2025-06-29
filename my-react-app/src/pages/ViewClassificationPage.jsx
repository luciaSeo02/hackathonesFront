import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchApi from '../services/fetchApi';

const ViewClassificationPage = () => {
    const { hackathonId } = useParams();
    const [classification, setClassification] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClassification = async () => {
            try {
                const res = await fetchApi(
                    `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}/classification/view`
                );
                setClassification(res.classification || []);
                // eslint-disable-next-line
            } catch (err) {
                setError('No se pudo cargar la clasificación.');
            } finally {
                setLoading(false);
            }
        };
        fetchClassification();
    }, [hackathonId]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-center mt-8">Cargando clasificación...</p>
            </div>
        );
    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-center mt-8 text-red-600">{error}</p>
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="rounded-3xl shadow-2xl border-2 border-gray-200 p-6 sm:p-10 w-full max-w-md sm:max-w-lg flex flex-col items-center transition-shadow hover:shadow-[0_8px_40px_rgba(95,61,196,0.15)] bg-white">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    Clasificación
                </h2>
                {classification.length === 0 ? (
                    <p className="text-center mt-4 text-gray-500">
                        Aún no hay clasificación publicada.
                    </p>
                ) : (
                    <div className="w-full flex justify-center">
                        <div className="overflow-x-auto w-full">
                            <table className="mx-auto w-full max-w-xs sm:max-w-md text-left border-collapse">
                               <thead>
                                    <tr>
                                        <th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                                            Avatar
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                                            Usuario
                                        </th>
                                        <th className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                                            Posición
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classification.map((row, i) => (
                                        <tr key={i}>
                                            <td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                                                <img
                                                    src={
                                                        row.avatar
                                                            ? row.avatar.startsWith('http')
                                                                ? row.avatar
                                                                : `${import.meta.env.VITE_URL_API}/uploads/avatar/${row.avatar}`
                                                            : '/defaultAvatar.png'
                                                    }
                                                    alt={row.username}
                                                    className="w-10 h-10 rounded-full object-cover mx-auto"
                                                />
                                            </td>
                                            <td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                                                {row.username}
                                            </td>
                                            <td className="py-2 px-2 sm:px-4 border-b border-gray-300 text-center">
                                                {row.position}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewClassificationPage;