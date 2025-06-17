import fetchApi from "./fetchApi";

const getInscriptionsToMyHackathonsService = async ()=> {
    const url = `${import.meta.env.VITE_API_URL}/user/hackathons/inscriptions`;
    const data = await fetchApi(url);
    return data.inscriptions;
}

export default getInscriptionsToMyHackathonsService