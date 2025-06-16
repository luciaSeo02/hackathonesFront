import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (

    <footer className="bg-gradient-to-br from-[#1565C0] to-[#9D4EDD] text-white px-6 py-10">

    <div className="w-full flex flex-col md:flex-row justify-between gap-8">

        {/* Nombre + Logo */}
        <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight"> 
                HackNmeet
            </h1>

            <div className="border border-gray-200 px-3 py-1 rounded bg-white text-gray-800 font-bold text-xs mt-4">
                LOGO
            </div>
        </div>

        {/* Navegación + Redes */}
        <div className="flex flex-col items-end text-right justify-between h-full">
            <nav className="flex flex-col items-end gap-1 text-sm ">
                <a href="/hackathons" className="hover:underline">Hackathones</a>
                <a href="/about" className="hover:underline">Sobre Hackathones</a>
                <a href="/contact" className="hover:underline">Contacto</a>
                <a href="/terms" className="hover:underline">Términos y Condiciones</a>
                <a href="/privacy" className="hover:underline">Política de Privacidad</a>
            </nav>
        
            <div className="flex gap-3 mt-2">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={20} />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={20} />
                </a>
            </div>
        </div>
    </div>

        {/* Derechos de autor */}

        <div className="text-xs text-left border-t border-white/30 mt-8 pt-4">
            © Copyright 2025 HACKATHONES.
            Todos los derechos reservados.
        </div>

    </footer>
    );

export default Footer;
