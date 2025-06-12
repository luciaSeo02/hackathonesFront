const registerUserService = async ({ email, password, username }) => {
    const url = `${import.meta.env.VITE_URL_API}/users/register`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default registerUserService;
