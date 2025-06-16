import { useEffect, useState } from 'react';

const useTopics = () => {
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        try {
            const getTopics = async () => {
                const url = `${import.meta.env.VITE_URL_API}/topics`;

                const response = await fetch(url);

                const json = await response.json();

                setTopics(json.data);
            };
            getTopics();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return topics;
};

export default useTopics;
