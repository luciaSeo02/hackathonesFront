const InfoCard = ({ children, gradient }) => {
    return (
        <div
            className={
            (gradient
                ? 'bg-gradient-to-br from-[#1565C0] to-[#9D4EDD] text-white '
                : 'bg-white text-gray-800 ') +
                'rounded-2xl p-6 shadow-lg mb-2 text-center '
            }
        >
            {children}
        </div>
    );
};



const AboutComponent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto m-8 p-8">
      {/* Título principal  */}
      <div className="w-full mb-6">
        <InfoCard gradient>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-black text-center">
            Sobre HackNMeet
          </h1>
          <p className="text-sm md:text-base font-normal text-center font-inter">
            La plataforma HackNMeet conecta a desarrolladores
            con hackathones, brindando acceso fácil y organizado
            a eventos presenciales y online, filtrados por
            tecnología, temática y fechas.
          </p>
        </InfoCard>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6">
        <InfoCard>
          <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-2 text-center">
            ¿Qué ofrecemos?
          </h2>
        </InfoCard>

        <InfoCard gradient>
          <h3 className="font-bold text-black mb-1 text-center">
            Para visitantes y nuevos usuarios:
          </h3>
          <p className="text-sm md:text-base text-center font-normal">
            Visualiza nuestro calendario interactivo de hackathones.
            Filtra por tus intereses (tecnología, modalidad, temática o fecha)
            y regístrate fácilmente para empezar a participar.
          </p>
        </InfoCard>

        <InfoCard>
          <h3 className="font-bold text-black mb-1 text-center">
            Para desarrolladores registrados:
          </h3>
          <p className="text-sm md:text-base text-center font-normal">
            Accede a detalles completos de cada evento, gestiona tu perfil,
            inscríbete con un clic y deja tu valoración tras competir.
            Además, podrás ver tu historial de participación y cancelar tu
            inscripción si es necesario.
          </p>
        </InfoCard>

        <InfoCard gradient>
          <h3 className="font-bold text-black mb-1 text-center">
            Para administradores:
          </h3>
          <p className="text-sm md:text-base text-center font-normal">
            Publica y edita hackathones de forma ágil. Gestiona la información
            de cada evento (nombre, descripción, modalidad, tecnología, etc.)
            y publica las clasificaciones oficiales al finalizar cada competencia.
          </p>
        </InfoCard>

        <InfoCard>
          <h4 className="font-bold text-black mb-1 text-center">
            Nuestra misión
          </h4>
          <p className="text-sm md:text-base text-center font-normal">
            Promover el crecimiento profesional, la colaboración y la creatividad
            entre desarrolladores a través de experiencias únicas en hackathones
            de todo tipo.
          </p>
        </InfoCard>
      </div>
    </div>
  );
};

export default AboutComponent;