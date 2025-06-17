import { Link } from "react-router-dom";

const PeopleInscriptionsList = ({ inscriptions }) => {
  if (!inscriptions.length) {
    return <p>No hay personas inscritas en tus hackathones.</p>;
  }

  return (
    <ul>
      {inscriptions.map((insc) => (
        <li key={insc.id}>
          <span className="font-bold">{insc.userName}</span> inscrito en {""}<Link to={`/hackathons/${insc.hackathonId}`}className="text-blue-600 hover:underline font-bold">
          {insc.name}</Link>
          <br />{insc.description}<br />
          Modalidad: {insc.modality}<br />
          {insc.modality === "online"
            ? <>URL: {insc.onlineUrl}</>
            : <>Ubicación: {insc.location}</>
          }<br />
          {insc.startDate} - {insc.endDate}
        </li>
      ))}
    </ul>
  );
};

export default PeopleInscriptionsList;