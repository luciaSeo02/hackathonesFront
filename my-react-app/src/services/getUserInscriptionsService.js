import fetchApi from "./fetchApi";

const getUserInscriptionsService = async ()=> {
     const url = `${import.meta.env.VITE_URL_API}/user/inscriptions`;
     const data = await fetchApi(url)
     return data.inscriptions;
};

export default getUserInscriptionsService;