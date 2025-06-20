import { useState, useEffect } from 'react';

const useHighlightedHackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighlightedHackathons = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/hackathons/highlighted`
                );

                if (!response.ok) {
                    throw new Error(
                        'Error al obtener los hackathones destacados'
                    );
                }

                const data = await response.json();
                setHackathons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlightedHackathons();
    }, []);

    return { hackathons, loading, error };
};

export default useHighlightedHackathons;
