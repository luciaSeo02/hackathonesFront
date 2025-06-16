const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] rounded-sm sm:px-4 sm:py-2 sm:rounded-lg"
        >
            <p className="text-white text-center text-xs sm:text-sm">
                {props.text}
            </p>
        </button>
    );
};

export default Button;
