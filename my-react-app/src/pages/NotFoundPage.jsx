const NotFoundPage = () => {
    return (
        <div
            className="bg-light-gradient dark:bg-dark-gradient min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 p-4"
            style={{ fontFamily: 'Orbitron, monospace' }}
        >
            <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md">

                <h1 className="text-7xl font-extrabold text-blue-600 mb-4"> 404 </h1>

                <p className="text-lg text-gray-600 mb-8"> Página no encontrada </p>

                <a href="/" className="bg-light-gradient text-white px-4 py-2 rounded transform transition-transform duration-200 hover:scale-105"> Volver al inicio </a>

            </div>
        </div>
    );
};

export default NotFoundPage;
