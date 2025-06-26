const NotAuthorizedPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="relative w-24 h-32 mb-14">
                <img
                    src="/notAuthorizedLogo.PNG"
                    alt="Acceso denegado"
                    className="w-full h-full object-cover z-0 relative top-3 opacity-90"
                />

                <h2 className="absolute -bot-0 left-1/2 -translate-x-1/2 text-5xl font-bold text-indigo-900 z-10 whitespace-nowrap">
                    Acceso denegado
                </h2>
            </div>

            <p className="text-lg text-gray-700 text-center">
                Lo sentimos, no tienes permiso para ver esta página.
            </p>
        </div>
    );
};

export default NotAuthorizedPage;
