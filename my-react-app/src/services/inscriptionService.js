const inscriptionService = async (hackathonId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}/inscriptions`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const json = await response.json();

    if (!response.ok) throw new Error(json.message || "Error al inscribirse");

    return json;
};

export default inscriptionService;