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
        <div className="flex flex-col lg:flex-row lg:justify-between">
            {/* Imagen */}
            <img
                src="./contact.jpg"
                alt="Imagen de contacto"
                className="w-screen h-[50vh] -mt-20 object-cover lg:order-last lg:w-[32vw] lg:h-full lg:-mb-20"
            />

            {/* Form */}
            <div className="px-6 pt-8 pb-4 flex flex-col justify-center lg:w-[67vw] lg:pt-20 lg:pl-10">
                <h2 className="mb-2 lg:mb-4">Contáctanos</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-600 text-base mb-6">
                            Si tienes alguna pregunta o comentario, no dudes en
                            ponerte en contacto con nosotros.
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

                    {/* Info contacto */}
                    <div className="flex flex-col justify-between gap-4">
                        <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
                            <Mail className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Email</p>
                                <p>hackathones2025@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
                            <Phone className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Teléfono</p>
                                <p>986 09 09 09</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
                            <MapPin className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Ubicación</p>
                                <p>Rúa Nicaragua, 8, 15005 A Coruña</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-lg shadow-sm">
                            <Clock className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Horario</p>
                                <p>Lunes a Viernes, 9:00 - 18:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactComponent;
