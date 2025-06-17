const getUserInscriptionsService = async () => {
    const url = `${import.meta.env.VITE_URL_API}/inscriptions`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.inscriptions;
};

export default getUserInscriptionsService;