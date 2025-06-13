const ButtonBig = (props) => {
    return (
        <button className="bg-light-gradient dark:bg-dark-gradient px-[18px] py-[10px] rounded-lg md:px-5 md:py-3 md:rounded-[10px]">
            <p className="text-white text-center text-sm font-semibold md:text-base">{props.text}</p>
        </button>
    );
};

export default ButtonBig;
