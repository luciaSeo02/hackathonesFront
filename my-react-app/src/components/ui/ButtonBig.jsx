const ButtonBig = (props) => {
    return (
        <button
            type={props.type || 'button'}
            onClick={props.onClick}
            className="bg-light-gradient dark:bg-dark-gradient w-full px-[18px] py-[10px] rounded-lg sm:px-5 sm:py-3 sm:rounded-[10px] transition-all duration-300 ease-in-out hover:scale-[1.02] hover:brightness-90"
        >
            <p className="text-white text-center text-sm font-semibold sm:text-base">
                {props.text}
            </p>
        </button>
    );
};

export default ButtonBig;
