const NotAuthorizedPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <img
                src="https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif"
                alt="Acceso denegado"
                className="w-64 h-64 mb-8"
            />
            <h1 className="text-4xl font-bold text-red-600 mb-4">
                Acceso denegado
            </h1>
            <p className="text-lg text-gray-700 mb-6">
                Lo sentimos, no tienes permiso para ver esta página.
            </p>
        </div>
    );
};

export default NotAuthorizedPage;
