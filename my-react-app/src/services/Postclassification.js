const fetchApiAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message || 'Error en la petición');

    return json;
};

export default fetchApiAuth;