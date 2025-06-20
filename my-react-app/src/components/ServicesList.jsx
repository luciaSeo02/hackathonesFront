import ServiceCard from './ui/ServiceCard.jsx';

const ServicesList = () => {
    return (
        <ul className="m-2.5 flex flex-col gap-2.5 lg:m-10 lg:mb-0 lg:flex-row lg:gap-5">
            <ServiceCard
                name={'Explora y encuentra eventos'}
                description={
                    'Accede a un catálogo de hackathons organizados por temática, nivel o modalidad. Desde retos locales hasta competiciones internacionales, elige el que más te motive y empieza a prepararte.'
                }
                number={'01'}
            />

            <ServiceCard
                name={'Inscripción y gestión rápida'}
                description={
                    'Crea tu perfil, únete a un equipo o participa de forma individual. Gestiona tu participación de manera sencilla y sigue el progreso de cada evento desde tu panel.'
                }
                number={'02'}
            />

            <ServiceCard
                name={'Conecta y colabora'}
                description={
                    'Forma parte de una comunidad activa de desarrolladores, diseñadores y entusiastas tech. Encuentra compañeros, recibe feedback y colabora en proyectos incluso más allá del hackathon.'
                }
                number={'03'}
            />
        </ul>
    );
};

export default ServicesList;
