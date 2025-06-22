const getInscriptionsToMyHackathonsService = async () => {
    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_URL_API}/inscriptions-to-my-hackathons`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.inscriptions;
};

export default getInscriptionsToMyHackathonsService;