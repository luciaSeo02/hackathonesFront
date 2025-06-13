const Button = (props) => {
    return (
        <button className="bg-light-gradient dark:bg-dark-gradient px-3 py-[6px] rounded-sm md:px-4 md:py-2 md:rounded-lg">
            <p className="text-white text-center text-xs md:text-sm">{props.text}</p>
        </button>
    );
};

export default Button;
