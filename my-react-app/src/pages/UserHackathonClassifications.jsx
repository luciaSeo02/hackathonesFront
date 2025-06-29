import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const LIMIT = 8;

const UserHackathonClassifications = () => {
    const { userLogged } = useContext(AuthContext);
    const [myHackathons, setMyHackathons] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (userLogged) {
            fetch(
                `${
                    import.meta.env.VITE_URL_API
                }/inscriptions?limit=${LIMIT}&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    setMyHackathons(data.inscriptions || []);
                    setTotal(data.total || 0);
                });
        }
    }, [userLogged, page]);

    const totalPages = Math.ceil(total / LIMIT);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (!userLogged) return <p>Debes iniciar sesión.</p>;

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h3 className="text-2xl font-bold mb-6 text-center mt-5">
                Hackathones en los que participas
            </h3>
            <div className="grid gap-4 mb-8">
                {myHackathons.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
                        No has participado en ningún hackathon.
                    </div>
                )}
                {myHackathons.map((h) => (
                    <div
                        key={h.id}
                        className="cursor-pointer bg-white rounded-xl shadow-md p-5 flex flex-col gap-2 transition border-2 border-transparent hover:border-indigo-300"
                        onClick={() =>
                            navigate(`/hackathons/${h.id}/classification/view`)
                        }
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

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default UserHackathonClassifications;
