import ServicesList from '../components/ServicesList.jsx';

const AboutPage = () => {
    return (
        <>
            <section className="bg-light-gradient dark:bg-dark-gradient text-white text-center h-[60vh] -mt-20 px-14 flex flex-col justify-center items-center gap-3 lg:px-64">
                <h2>Dónde empieza la aventura</h2>
                <p>
                    HackNMeet es el punto de encuentro para quienes quieren
                    crear, aprender y competir. Esta plataforma fue pensada para
                    hacer de cada hackathon una experiencia única. ¿Te unes al
                    desafío?
                </p>
            </section>

            <section className="bg-white -mt-20 pt-10 rounded-3xl flex flex-col justify-center gap-3 lg:-mt-20 lg:pt-20 lg:rounded-[40px] lg:flex-row lg:gap-5">
                <p className="font-semibold text-center px-11 lg:hidden">
                    Creemos en el poder de las ideas y en lo que sucede cuando
                    se juntan las personas adecuadas.
                </p>
                <img
                    className="w-[calc(100vw-20px)] ml-2.5 rounded-xl lg:order-first lg:w-[440px] lg:h-[500px] lg:ml-0 lg:rounded-2xl"
                    src="./about.jpg"
                    alt="Robot"
                />
                <p className="text-center px-11 flex flex-col justify-between lg:text-left lg:w-[440px] lg:px-0">
                    <span className="hidden font-semibold lg:block">
                        Creemos en el poder de las ideas y en lo que sucede
                        cuando se juntan las personas adecuadas.
                    </span>
                    Esta plataforma nace con un objetivo claro: hacer de los
                    hackathons algo más que una competición. Queremos que sean
                    una experiencia accesible, motivadora y llena de
                    oportunidades, donde cualquiera pueda aportar, aprender y
                    crecer.
                    <br />
                    <br />
                    Aquí la innovación se vive en equipo. Cada evento es una
                    excusa para compartir conocimientos, crear proyectos reales
                    y conectar con otras personas que, como tú, tienen ganas de
                    cambiar las cosas con tecnología.
                </p>
            </section>

            <section className="mt-10 flex flex-col gap-3 lg:mt-20">
                <h2 className="text-center px-10">Nuestros servicios</h2>
                <p className="text-center px-11 lg:px-80">
                    En HackNMeet diseñamos cada función pensando en facilitarte
                    el camino antes, durante y después de cada evento. Estos son
                    los pilares que hacen que tu experiencia sea completa.
                </p>
                <ServicesList />
            </section>
        </>
    );
};

export default AboutPage;
