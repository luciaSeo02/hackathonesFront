const NotAuthorizedPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-5">
            <div className="relative w-24 h-32 md:mb-14 mb-5">
                <img
                    src="/notAuthorizedLogo.PNG"
                    alt="Acceso denegado"
                    className="w-full h-full object-cover z-0 relative top-3 opacity-90"
                />

                <h2 className="absolute left-1/2 -translate-x-1/2 -md:text-5xl font-bold text-indigo-900 z-10 whitespace-nowrap">
                    Acceso denegado
                </h2>
            </div>

            <p className="text-lg text-gray-700 text-center text-base md:text2xl mt-5">
                Lo sentimos, no tienes permiso para ver esta página.
            </p>
        </div>
    );
};

export default NotAuthorizedPage;
