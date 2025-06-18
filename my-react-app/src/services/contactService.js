const contactService = async ({ name, email, message }) => {
    const url = `${import.meta.env.VITE_URL_API}/contact`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        console.log('Respuesta del backend:', response); 

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del backend:', errorText);
            throw new Error(
                `Error en la petición: ${response.status} ${response.statusText} - ${errorText}`
            );
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error en contactService:', error);
        throw error; 
    }
};

export default contactService;
