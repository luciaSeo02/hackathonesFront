const Banner = () => {
    return (
        <article className="bg-light-gradient dark:bg-dark-gradient relative px-8 pt-12 pb-52 text-white text-center lg:p-10 lg:text-start">
            <h2 className="lg:w-[785px]">Trae tus ideas y crea algo épico</h2>
            <p className="pt-3 lg:w-[785px] lg:pt-20">
                HackNMeet es la plataforma que conecta a personas apasionadas
                por la tecnología a través de hackathones únicos. Participa en
                eventos donde la colaboración, la innovación y la creatividad se
                juntan para convertir ideas en proyectos reales.
            </p>
            <img
                className="absolute right-2.5 -bottom-14 w-[calc(100vw-20px)] object-cover rounded-xl lg:-top-10 lg:right-10 lg:-bottom-0 lg:w-[400px] lg:h-[350px] lg:rounded-2xl"
                src="/banner.jpg"
                alt="Hackathon"
            />
        </article>
    );
};

export default Banner;
