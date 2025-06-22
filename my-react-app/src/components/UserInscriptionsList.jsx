import { Link } from "react-router-dom";
import deleteInscriptionService from "../services/deleteInscriptionService";
import { useState } from "react";

const UserInscriptionsList = ({ inscriptions, onRemove }) => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  inscriptions.forEach(insc => console.log(insc));

  const handleDelete = async (hackathonId) => {
    try {
      await deleteInscriptionService(hackathonId);
      setMessage("Inscripción eliminada correctamente.");
      if (onRemove) onRemove();
    } catch (error) {
      setMessage(error.message || "Error al eliminar la inscripción");
    } finally {
      setShowPopup(false);
      setSelectedId(null);
    }
  };

  if (!inscriptions.length) {
    return <p>No has hecho ninguna inscripcion.</p>
  }

return (
    <>
      <ul className="space-y-3">
        {inscriptions.map((insc) => (
          <li
            key={insc.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm px-4 py-3 flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <Link
                to={`/hackathons/${insc.hackathonId || insc.id}`}
                className="text-indigo-600 hover:underline font-bold text-base"
              >
                {insc.name}
              </Link>
              <button
                onClick={() => { setShowPopup(true); setSelectedId(insc.hackathonId || insc.id); }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
              >
                Eliminar
              </button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
              <span><span className="font-semibold">Descripción:</span> {insc.description}</span>
              <span><span className="font-semibold">Modalidad:</span> {insc.modality}</span>
              {insc.modality === 'online'
                ? <span><span className="font-semibold">Link:</span> {insc.onlineUrl}</span>
                : <span><span className="font-semibold">Ubicación:</span> {insc.location}</span>
              }
              <span><span className="font-semibold">Fechas:</span> {insc.startDate} - {insc.endDate}</span>
            </div>
            {message && <p className="text-green-600 mt-2">{message}</p>}
          </li>
        ))}
      </ul>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
            <p className="mb-4 font-semibold text-gray-800">
              ¿Seguro que quieres eliminar tu inscripción?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(selectedId)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => { setShowPopup(false); setSelectedId(null); }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserInscriptionsList;