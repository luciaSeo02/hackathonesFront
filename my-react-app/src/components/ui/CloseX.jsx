import { X } from "lucide-react";

const CloseX = ({ onClick, size = 80, className = "" }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center rounded-md bg-light-gradient dark:bg-dark-gradient shadow-lg hover:scale-105 transition-all duration-200 ${className}`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        type="button"
        aria-label="Cerrar"
    >
        <X
            size={size * 0.75}
            color="white"
            strokeWidth={3}
            className="block mx-auto my-auto"
        />
    </button>
);

export default CloseX;