export async function createHackathon(hackathonData) {

    const token = localStorage.getItem('token');
    const url = `${import.meta.env.VITE_URL_API}/hackathons/create`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(hackathonData)
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return response;
}
