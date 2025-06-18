import { useEffect, useState } from 'react';
import fetchApi from '../services/fetchApi.js';

const useTopics = () => {
    const [topics, setTopics] = useState(null);
    const { VITE_URL_API } = import.meta.env;

    useEffect(() => {
        const getTopics = async () => {
            const topics = await fetchApi(`${VITE_URL_API}/lists/topics`);

            setTopics(topics.data);
        };
        getTopics();
    }, []);

    return topics;
};

export default useTopics;
