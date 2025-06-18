import { useNavigate } from "react-router-dom";
import ButtonBig from "../components/ui/ButtonBig";

const NotFoundPage = () => {

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };
    return (
        <div
            className="bg-light-gradient dark:bg-dark-gradient min-h-screen flex items-center justify-center p-4"
        >

            <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md">

                <h1 className="text-5xl font-extrabold text-blue-600 mb-4"> 404 </h1>

                <p className="text-lg text-gray-600 mb-6 text-center"> Página no encontrada </p>

                <ButtonBig 
                type="button" 
                text="Volver al inicio" 
                onClick={handleGoHome} 
                />

            </div>
        </div>
    );
};

export default NotFoundPage;
