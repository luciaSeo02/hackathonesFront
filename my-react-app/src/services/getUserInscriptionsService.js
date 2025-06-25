const getUserInscriptionsService = async (limit = 24, page = 1) => {
    const url = `${
        import.meta.env.VITE_URL_API
    }/inscriptions?limit=${limit}&page=${page}`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

export default getUserInscriptionsService;
