import { useState } from "react";
import PrivacyContent from "../components/PrivacyContent";
import { US } from 'country-flag-icons/react/3x2';
import { ES } from 'country-flag-icons/react/3x2';

const Privacy = () => {
    const [lang, setLang] = useState("es");

    return (
        <section>
            <div className="bg-light-gradient dark:bg-dark-gradient text-white text-center h-[60vh] -mt-20 px-14 flex flex-col justify-center items-center gap-3 lg:px-64">

                <h2>Política de Privacidad</h2>
                <p>
                    Tu privacidad es importante para HackNMeet. Consulta nuestra política para saber cómo protegemos tus datos.
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
            <PrivacyContent lang={lang} />
        </section>
    );
};

export default Privacy;