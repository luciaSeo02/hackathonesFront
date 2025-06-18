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
      <ul>
        {inscriptions.map((insc) => (
          <li key={insc.id}>
            <Link to={`/hackathons/${insc.hackathonId || insc.id}`} className="text-blue-600 hover:underline font-bold">
              {insc.name}
            </Link>
            <br />{insc.description}<br />
            Modalidad: {insc.modality}<br />
            {insc.modality === 'online'
              ? <>Link del Hackathon: {insc.onlineUrl}</>
              : <>Ubicación: {insc.location}</>}
            <br />
            {insc.startDate} - {insc.endDate}
            <br />
            <button
              onClick={() => setShowPopup(true) || setSelectedId(insc.hackathonId || insc.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs mt-2"
            >
              Eliminar
            </button>
          </li>
        ))}
        {message && <p className="text-green-600 mt-2">{message}</p>}
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