import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../services/fetchApi";

const ViewClassificationPage = () => {
  const { hackathonId } = useParams();
  const [classification, setClassification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const res = await fetchApi(
          `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}/classification/view`
        );
        setClassification(res.classification || []);
      } catch (err) {
        setError("No se pudo cargar la clasificación.");
      } finally {
        setLoading(false);
      }
    };
    fetchClassification();
  }, [hackathonId]);

  if (loading) return <p className="text-center mt-8">Cargando clasificación...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Clasificación</h2>
        {classification.length === 0 ? (
          <p className="text-center mt-4 text-gray-500">Aún no hay clasificación publicada.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Posición</th>
                <th className="py-2 px-4 border-b">Usuario</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {classification.map((row, i) => (
                <tr key={i}>
                  <td className="py-2 px-4 border-b">{row.position}</td>
                  <td className="py-2 px-4 border-b">{row.username}</td>
                  <td className="py-2 px-4 border-b">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewClassificationPage;