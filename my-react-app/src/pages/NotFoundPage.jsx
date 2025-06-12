const NotFoundPage = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 p-4"
            style={{ fontFamily: 'Orbitron, monospace' }}
        >
            <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md">

                <h1 className="text-7xl font-extrabold text-blue-700 mb-4"> 404 </h1>

                <p className="text-lg text-gray-700 mb-8"> Página no encontrada </p>

                <a href="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"> Volver al inicio </a>

            </div>
        </div>
    );
};

export default NotFoundPage;
