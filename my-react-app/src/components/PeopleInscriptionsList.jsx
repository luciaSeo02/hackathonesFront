import { Link } from "react-router-dom";

// Función para agrupar inscripciones por hackathonId
function groupByHackathon(inscriptions) {
  const grouped = {};
  for (const insc of inscriptions) {
    if (!grouped[insc.hackathonId]) {
      grouped[insc.hackathonId] = {
        hackathon: {
          id: insc.hackathonId,
          name: insc.name,
          description: insc.description,
          modality: insc.modality,
          onlineUrl: insc.onlineUrl,
          location: insc.location,
          startDate: insc.startDate,
          endDate: insc.endDate,
        },
        people: [],
      };
    }
    grouped[insc.hackathonId].people.push(insc.userName);
  }
  return Object.values(grouped);
}

const PeopleInscriptionsList = ({ inscriptions }) => {
  if (!inscriptions.length) {
    return <p>No hay personas inscritas en tus hackathones.</p>;
  }

const hackathons = groupByHackathon(inscriptions);

  return (
    <ul>
      {hackathons.map(({ hackathon, people }) => (
        <li key={hackathon.id} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <Link
            to={`/hackathons/${hackathon.id}`}
            className="text-blue-600 hover:underline font-bold text-lg"
          >
            {hackathon.name}
          </Link>
          <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">
            {hackathon.description}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Modalidad:</span> {hackathon.modality}
          </div>
          <div className="mb-1">
            {hackathon.modality === "online"
              ? (<><span className="font-semibold">URL:</span> {hackathon.onlineUrl}</>)
              : (<><span className="font-semibold">Ubicación:</span> {hackathon.location}</>)
            }
          </div>
          <div className="mb-2">
            <span className="font-semibold">Fechas:</span> {hackathon.startDate} - {hackathon.endDate}
          </div>
          <div>
            <span className="font-semibold">Personas inscritas:</span>
            <ul className="list-disc ml-6 mt-1">
              {people.map((userName, idx) => (
                <li key={idx}>{userName}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};



export default PeopleInscriptionsList;