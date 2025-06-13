import { Search } from 'lucide-react';

const SearchBar = () => {
    return (
        <div className="bg-neutral-100 w-60 px-[10px] py-2 rounded-lg flex items-center gap-[10px]">
            <div>
                <Search size={15} />
            </div>

            <p className="text-[#afafaf] text-xs md:text-sm">
                Buscar hackathones
            </p>
        </div>
    );
};

export default SearchBar;
