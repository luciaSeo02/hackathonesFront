const loginUserService = async ({ email, password, rememberMe }) => {
    const url = `${import.meta.env.VITE_URL_API}/users/login`;

    const dataLogin = {
        email,
        password,
        rememberMe,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(dataLogin),
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json.data.token;
};

export default loginUserService;
