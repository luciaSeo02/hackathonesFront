import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import ErrorDiv from './ui/ErrorDiv';
import Success from './ui/Success';

const StarRating = ({ hackathonId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => setError(null), 4000);
            return () => clearTimeout(timeout);
        }
    }, [error]);

    useEffect(() => {
        if (submitted) {
            const timeout = setTimeout(() => setSubmitted(false), 4000);
            return () => clearTimeout(timeout);
        }
    }, [submitted]);

    const handleSubmit = async (value) => {
        if (submitted) return;

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
            setSubmitted(true);
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
                    >
                        <Star
                            size={20}
                            className={`${
                                (hover || rating) >= val
                                    ? 'fill-yellow-400 stroke-yellow-400'
                                    : 'stroke-gray-300'
                            } transition`}
                        />
                    </button>
                ))}
            </div>

            {submitted && !error && (
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
