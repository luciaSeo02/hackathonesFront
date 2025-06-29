export async function createHackathon(hackathonData) {
    const token = localStorage.getItem('token');
    const url = `${import.meta.env.VITE_URL_API}/hackathons/create`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
        body: JSON.stringify(hackathonData),
    });

    const json = await response.json();

    if (!response.ok) {
        if (Array.isArray(json.error)) {
            const joined = json.error.join('\n');
            throw new Error(joined);
        } else {
            throw new Error(json.message || 'Error al crear hackathon');
        }
    }

    return json;
}
