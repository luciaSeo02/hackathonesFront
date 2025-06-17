import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-light-gradient dark:bg-dark-gradient text-white mt-10 px-5 pt-5 pb-10 lg:mt-20 lg:p-10">
        <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between">
            {/* Nombre + Logo */}
            <div className="flex flex-col lg:w-[785px] lg:justify-between">
                <h3 className="hidden lg:inline-block">
                    Tecnología e ideas que se encuentran para transformar
                </h3>

                <Link to={'/'}>
                    <h4>HackNMeet</h4>
                </Link>
            </div>

            {/* Navegación + Redes */}
            <div className="flex flex-col gap-2.5 lg:text-right">
                <menu className="flex flex-col gap-2.5">
                    <Link to={'/hackathons'} className="hover:underline">
                        Hackathones
                    </Link>
                    <Link to={'/about'} className="hover:underline">
                        Sobre HackNMeet
                    </Link>
                    <Link to={'/contact'} className="hover:underline">
                        Contacto
                    </Link>
                    <Link to={'/terms'} className="hover:underline">
                        Términos y Condiciones
                    </Link>
                    <Link to={'/privacy'} className="hover:underline">
                        Política de Privacidad
                    </Link>
                </menu>

                <div className="mt-2.5 flex gap-2.5 lg:hidden">
                    <Link to={'https://www.facebook.com/'} target="_blank">
                        <FaFacebookF size={20} />
                    </Link>
                    <Link to={'https://www.instagram.com/'} target="_blank">
                        <FaInstagram size={20} />
                    </Link>
                    <Link to={'https://www.linkedin.com/'} target="_blank">
                        <FaLinkedinIn size={20} />
                    </Link>
                </div>
            </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-white/30 mt-5 pt-5 lg:mt-6 lg:flex lg:justify-between lg:items-center">
            <p>© Copyright 2025 HackNMeet. Todos los derechos reservados.</p>

            <div className="hidden gap-2.5 lg:flex">
                <Link to={'https://www.facebook.com/'} target="_blank">
                    <FaFacebookF size={20} />
                </Link>
                <Link to={'https://www.instagram.com/'} target="_blank">
                    <FaInstagram size={20} />
                </Link>
                <Link to={'https://www.linkedin.com/'} target="_blank">
                    <FaLinkedinIn size={20} />
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
