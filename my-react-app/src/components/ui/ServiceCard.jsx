const ServiceCard = ({ name, description, number }) => {
    return (
        <article className="bg-neutral-100 relative w-[calc(100vw-20px)] h-[340px] p-6 rounded-2xl flex flex-col justify-end items-start gap-2.5 lg:w-[440px] lg:h-[500px] lg:p-6 lg:rounded-2xl hover:bg-light-gradient hover:text-white dark:hover:bg-dark-gradient transition-all duration-500 ease-in-out">
            <h3>{name}</h3>
            <p className="pr-4 lg:pr-6">{description}</p>
            <h3 className="text-light-gradient dark:text-dark-gradient absolute top-5 right-6 lg:top-6 lg:right-6">
                {number}
            </h3>
        </article>
    );
};

export default ServiceCard;
