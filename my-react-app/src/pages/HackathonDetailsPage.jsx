import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HackathonCard from "../components/hackathonCard";
import getHackathonByIdService from "../services/getHackathonByIdService";

const HackathonDetailPage = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getHackathonByIdService(id)
      .then((data) => setHackathon(data))
      .catch(() => setError("No se pudo cargar el hackathon"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Cargando hackathon...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!hackathon) return <p className="text-center text-gray-500 mt-10">No se encontró el hackathon.</p>;

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 font-body">
        <h1 className="text-3xl font-display font-bold text-purple-700 dark:text-purple-300 mb-4 text-center">{hackathon.name}</h1>
      <HackathonCard
        title={hackathon.name}
        description={hackathon.description}
        date={`${hackathon.startDate} - ${hackathon.endDate}`}
      />
    </div>
    </div>
  );
};

export default HackathonDetailPage;