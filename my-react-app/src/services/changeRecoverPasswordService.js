export const changeRecoverPasswordService = async ({ email, recoverPassCode, newPassword }) => {
    const url = `${import.meta.env.VITE_URL_API}/users/password/edit`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, recoverPassCode, newPassword }),
    });

    const json = await response.json();

    if (!response.ok) throw new Error(json.message);

    return json;
};
