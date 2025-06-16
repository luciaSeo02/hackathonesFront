const validateUserService = async (registrationCode) => {
    const url = `${ import.meta.env.VITE_URL_API }/users/validate/${registrationCode}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};

export default validateUserService;
