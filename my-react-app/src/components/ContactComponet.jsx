import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm.jsx';

const ContactComponent = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

const [status, setStatus] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center py-28 px-4 md:px-12 ">
        
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">

        {/* Form*/}
            <div className="w-full md:w-3/5">
                <h1 className="text-3xl font-extrabold text-black mb-1 text-center md:text-left">
                Contáctanos
                </h1>
                <p className="text-gray-600 text-base mb-4 text-center md:text-left">
                Si tienes alguna pregunta o comentario, no dudes en
                ponerte en contacto con nosotros. Estamos aquí para ayudarte.
                </p>

                <ContactForm
                    form={form}
                    setForm={setForm}
                    status={status}
                    setStatus={setStatus}
                    error={error}
                    setError={setError}
                    success={success}
                    setSuccess={setSuccess}
                />
            </div>

            {/* Información de contacto */}
            <div className="w-full md:w-2/5 flex flex-col gap-4">

            {/* Email */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <Mail className="text-purple-600" />
                <div>
                    <p className="font-bold text-sm">Email</p>
                    <p className="text-sm text-gray-600">hackathones2025@gmail.com</p>
                </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <Phone className="text-purple-600" />
                <div>
                    <p className="font-bold text-sm">Teléfono</p>
                    <p className="text-sm text-gray-600">986 09 09 09</p>
                </div>
            </div>

            {/* Ubicación */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <MapPin className="text-purple-600" />
                <div>
                    <p className="font-bold text-sm">Ubicación</p>
                    <a
                        href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd2e7d407997464b:0x5ee1171fbad2ceca?sa=X&ved=1t:8290&ictx=111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:underline"
                    >
                        Rúa Nicaragua, 8, 15005 A Coruña
                    </a>
                </div>
            </div>

            {/* Horario */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <Clock className="text-purple-600" />
                <div>
                    <p className="font-bold text-sm">Horario</p>
                    <p className="text-sm text-gray-600">Lunes a Viernes, 9:00 - 18:00</p>
                </div>
            </div>
        </div>
    </div>
</div>
);
};

export default ContactComponent;