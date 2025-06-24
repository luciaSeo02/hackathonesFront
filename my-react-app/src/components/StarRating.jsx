import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import ErrorDiv from './ui/ErrorDiv';
import Success from './ui/Success';

const StarRating = ({ hackathonId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [hasRated, setHasRated] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserRating = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_URL_API
                    }/hackathons/${hackathonId}/rating`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) return;

                const data = await res.json();

                console.log(data);

                if (typeof data.rating === 'number') {
                    setRating(data.rating);
                    setHasRated(true);
                }
            } catch (err) {
                console.error('Error al cargar el rating del usuario');
            }
        };

        fetchUserRating();
    }, [hackathonId]);

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => setError(null), 4000);
            return () => clearTimeout(timeout);
        }
    }, [error]);

    useEffect(() => {
        if (showSuccess) {
            const timeout = setTimeout(() => setShowSuccess(false), 4000);
            return () => clearTimeout(timeout);
        }
    }, [showSuccess]);

    const handleSubmit = async (value) => {
        if (hasRated) return;

        const token = localStorage.getItem('token');

        try {
            const res = await fetch(
                `${
                    import.meta.env.VITE_URL_API
                }/hackathons/${hackathonId}/rating`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ rating: value }),
                }
            );

            if (!res.ok) {
                const text = await res.text();
                let message = 'Error al enviar rating';
                try {
                    const json = JSON.parse(text);
                    message = json.message || message;
                } catch (_) {}
                throw new Error(message);
            }

            setRating(value);
            setHasRated(true);
            setShowSuccess(true);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                    <button
                        key={val}
                        type="button"
                        onClick={() => handleSubmit(val)}
                        onMouseEnter={() => setHover(val)}
                        onMouseLeave={() => setHover(null)}
                        disabled={hasRated}
                    >
                        <Star
                            size={20}
                            className={`${
                                (hover !== null ? hover : rating) >= val
                                    ? 'fill-yellow-400 stroke-yellow-400'
                                    : 'stroke-gray-300'
                            } transition`}
                        />
                    </button>
                ))}
            </div>

            {showSuccess && !error && (
                <div className="w-40">
                    <Success success="¡Gracias por valorar!" />
                </div>
            )}

            {error && (
                <div className="w-40">
                    <ErrorDiv error={error} />
                </div>
            )}
        </div>
    );
};

export default StarRating;
