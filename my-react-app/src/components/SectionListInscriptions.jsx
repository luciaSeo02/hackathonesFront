import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContextProvider";
import getUserInscriptionsService from "../services/getUserInscriptionsService"
import getInscriptionsToMyHackathonsService from "../services/getInscriptionsToMyHackathonsService";
import UserInscriptionsList from "./UserInscriptionsList"
import PeopleInscriptionsList from "./PeopleInscriptionsList";

const SectionListInscriptions = () => {
  const { userLogged } = useContext(AuthContext);

  const [inscriptions, setInscriptions] = useState([]);
  const [loadingInscriptions, setLoadingInscriptions] = useState(true);

  const [peopleInscriptions, setPeopleInscriptions] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(true);

   const fetchInscriptions = async () => {
    setLoadingInscriptions(true);
    try {
      const data = await getUserInscriptionsService();
      setInscriptions(data);
    } catch {
      setInscriptions([]);
    } finally {
      setLoadingInscriptions(false);
    }
  };

  useEffect(() => {
    if (!userLogged) return;

    getUserInscriptionsService()
      .then(setInscriptions)
      .catch(() => setInscriptions([]))
      .finally(() => setLoadingInscriptions(false));

      if (userLogged.role === "admin") {
    getInscriptionsToMyHackathonsService()
      .then(setPeopleInscriptions)
      .catch(() => setPeopleInscriptions([]))
      .finally(() => setLoadingPeople(false));
        } else {
      setLoadingPeople(false);
    }
  }, [userLogged]);

 return (
    <section className="mt-10 p-6 bg-neutral-100 dark:bg-gray-800 rounded-xl shadow font-body">
      <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">
        Mis inscripciones
      </h2>
      {loadingInscriptions ? (
        <p className="text-gray-500">Cargando inscripciones...</p>
      ) : (
        <UserInscriptionsList inscriptions={inscriptions} onRemove={fetchInscriptions} />
      )}

{userLogged && userLogged.role === "admin" && (
        <>
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Personas inscritas a mis hackathones</h2>
          {loadingPeople ? (
            <p className="text-gray-500">Cargando personas...</p>
          ): (
            <PeopleInscriptionsList inscriptions={peopleInscriptions}  />
          )}
        </>
      )}
    </section>
  );
  
};

export default SectionListInscriptions;

