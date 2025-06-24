import { useState } from "react";
import TermsContent from "../components/TermsContent";
import { US } from 'country-flag-icons/react/3x2';
import { ES } from 'country-flag-icons/react/3x2'; 

const Terms = () => {
    const [lang, setLang] = useState("es");

    return (
        <section>
            <div className="bg-light-gradient dark:bg-dark-gradient text-white text-center h-[60vh] -mt-20 px-14 flex flex-col justify-center items-center gap-3 lg:px-64">
                <h2>Términos y Condiciones</h2>
                <p>
                    Bienvenido a HackNMeet. Al utilizar nuestra plataforma, aceptas cumplir con nuestros términos y condiciones.
                </p>
                {/* Selector de idioma */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setLang("es")}
                        className={lang === "es" ? "opacity-100 border-2" : "opacity-50"}
                        aria-label="Español"
                    >
                        <ES title="Español" className="w-6 h-4" />
                        
                    </button>
                    <button
                        onClick={() => setLang("en")}
                        className={lang === "en" ? "opacity-100 border-2" : "opacity-50"}
                        aria-label="English"
                    >
                        <US title="English" className="w-6 h-4" />
                        
                    </button>
                </div>
            </div>
            <TermsContent lang={lang} />
        </section>
    );
};

export default Terms;