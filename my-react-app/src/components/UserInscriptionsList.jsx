import { Link } from "react-router-dom";

const UserInscriptionsList= ({inscriptions}) => {
  if (!inscriptions.length) {
    return <p>No has hecho ninguna inscripcion.</p>
  } 

  return(
    <ul>
      {inscriptions.map((insc)=>(
        <li key={insc.id}>
          <Link to={`/hackathons/${insc.hackathonId}`} className="text-blue-600 hover:underline font-bold">{insc.name}</Link>
          <br />{insc.description}<br/>
          Modalidad: {insc.modality}<br/>
          {insc.modality === 'online'
          ? <>Link del Hackathon: {insc.onlineUrl}</>
          : <>Ubicación: {insc.location}</>}
          <br/>
          {insc.startDate} - {insc.endDate}
        </li>
      ))}
    </ul>
  );
}

export default UserInscriptionsList;