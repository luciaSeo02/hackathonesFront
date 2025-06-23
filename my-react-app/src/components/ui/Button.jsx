const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] sm:px-4 sm:py-2 rounded-md"
        >
            <p className="text-white text-center text-xs sm:text-sm">
                {props.text}
            </p>
        </button>
    );
};

export default Button;
