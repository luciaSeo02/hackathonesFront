import { Link } from "react-router-dom";


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
    <ul className="space-y-4">
      {hackathons.map(({ hackathon, people }) => (
        <li key={hackathon.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-x-6 gap-y-1 items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
            <Link
              to={`/hackathons/${hackathon.id}`}
              className="text-blue-600 hover:underline font-bold text-base"
            >
              {hackathon.name}
            </Link>
            <span><span className="font-semibold">Descripción:</span> {hackathon.description}</span>
            <span><span className="font-semibold">Modalidad:</span> {hackathon.modality}</span>
            {hackathon.modality === "online"
              ? <span><span className="font-semibold">URL:</span> {hackathon.onlineUrl}</span>
              : <span><span className="font-semibold">Ubicación:</span> {hackathon.location}</span>
            }
            <span><span className="font-semibold">Fechas:</span> {hackathon.startDate} - {hackathon.endDate}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold">Personas inscritas:</span>
            <ul className="list-disc ml-6 mt-1">
              {people.length > 0
                ? people.map((userName, idx) => (
                    <li key={idx}>{userName}</li>
                  ))
                : <li className="italic text-gray-400">Nadie inscrito aún</li>
              }
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};



export default PeopleInscriptionsList;