import { ChevronRight, ChevronLeft } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-8 gap-2">
            {/* Mobile: solo flechas */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 block lg:hidden"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 block lg:hidden"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Desktop: texto y números */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 hidden lg:block"
            >
                Anterior
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    className={`px-3 py-1 rounded hidden lg:inline-block ${
                        currentPage === i + 1
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 hidden lg:block"
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
