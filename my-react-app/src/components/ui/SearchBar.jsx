import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = ({ initialValue = '', filters = {} }) => {
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const timeoutRef = useRef();

    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        clearTimeout(timeoutRef.current);
        if (value.trim() === '') {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        timeoutRef.current = setTimeout(async () => {
        try {
            const params = new URLSearchParams({ query: value, ...filters });
            const res = await fetch(
                `${import.meta.env.VITE_URL_API}/autocomplete?${params.toString()}`
            );
            const data = await res.json();
            console.log('Sugerencias:', data); // <-- LOG
            setSuggestions(data);
            setShowSuggestions(Array.isArray(data) && data.length > 0);
        } catch (err) {
            console.error('Error en autocompletado:', err);
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, 200);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        handleSubmit(null, suggestion);
    };

    const handleSubmit = (e, customQuery) => {
        if (e) e.preventDefault();
        const trimmedQuery = (
            customQuery !== undefined ? customQuery : query
        ).trim();
        const params = new URLSearchParams(searchParams);
        if (trimmedQuery !== '') {
            params.set('search', trimmedQuery);
        } else {
            params.delete('search');
        }
        navigate(`/hackathons?${params.toString()}`);
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full sm:w-60">
            <form
                onSubmit={handleSubmit}
                className="bg-neutral-100 w-full px-[10px] py-2 rounded-lg flex items-center gap-[10px]"
                autoComplete="off"
            >
                <Search size={15} stroke="#5F3DC4" strokeWidth="2" />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Buscar hackathones"
                    className="bg-transparent outline-none text-xs md:text-sm text-gray-800 w-full"
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                    onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 100)
                    }
                />
                <button type="submit" className="hidden">
                    Buscar
                </button>
            </form>
            {showSuggestions && (
                <ul className="absolute z-50 left-0 right-0 bg-white border border-indigo-200 rounded-b-lg shadow-lg max-h-48 overflow-y-auto font-sans text-gray-800 text-xs md:text-sm">
        {suggestions.length > 0 ? (
            suggestions.map((s, i) => (
                <li
                    key={i}
                    className="px-4 py-2 cursor-pointer hover:bg-indigo-100 transition-colors duration-150 font-medium"
                    onMouseDown={() => handleSuggestionClick(s)}
                >
                    {s}
                </li>
            ))
        ) : (
            <li className="px-4 py-2 text-xs text-gray-400 font-medium">Sin sugerencias</li>
        )}
    </ul>
            )}
        </div>
    );
};

export default SearchBar;
