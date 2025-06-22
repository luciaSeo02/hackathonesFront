import { X } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4 sm:hidden">
            <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <X />
                </button>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Filtrar hackathones
                </h3>
                {children}
            </div>
        </div>
    );
};

export default FilterModal;
