const recoverPassService = async (email) => {
    const url = `${import.meta.env.VITE_URL_API}/users/password/recover`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default recoverPassService;
