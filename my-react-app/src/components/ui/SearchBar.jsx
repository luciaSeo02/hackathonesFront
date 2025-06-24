import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = ({ initialValue = '' }) => {
    const [query, setQuery] = useState(initialValue);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = query.trim();

        // Mantén los filtros activos al buscar
        const params = new URLSearchParams(searchParams);
        if (trimmedQuery !== '') {
            params.set('search', trimmedQuery);
        } else {
            params.delete('search');
        }
        navigate(`/hackathons?${params.toString()}`);
        setQuery('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-neutral-100 w-full sm:w-60 px-[10px] py-2 rounded-lg flex items-center gap-[10px]"
        >
            <Search size={15} stroke="#5F3DC4" strokeWidth="2" />
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Buscar hackathones"
                className="bg-transparent outline-none text-xs md:text-sm text-gray-800 w-full"
            />
            <button type="submit" className="hidden">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;
