const getDataUserLoggedService = async (token) => {
    const url = `${import.meta.env.VITE_URL_API}/users`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json.data;
};

export default getDataUserLoggedService;
