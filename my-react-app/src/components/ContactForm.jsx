import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import contactService from '../services/contactService.js';

const ContactForm = ({ form, setForm, status, setStatus }) => {
    const inputClass =
        'w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ';

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    try {
        console.log('Datos a enviar:', form); 
        await contactService(form);
        setStatus('¡Mensaje enviado correctamente!');
        setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
        console.error('Error enviando el formulario:', error);
        setStatus('Error al enviar el mensaje');
    }
};

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nombre"
                    className={inputClass}
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Correo electrónico"
                    className={inputClass}
                    required
                />
            </div>
            
            <div>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Mensaje"
                    className={inputClass + ' resize-none'}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-4 text-base rounded-lg text-white font-semibold shadow transition bg-gradient-to-br from-[#1565C0] to-[#9D4EDD] hover:from-blue-700 hover:to-purple-700 mt-2 "
            >
                Enviar
            </button>
            {status && <p className="text-center mt-2">{status}</p>}
        </form>
    );
};

const ContactComponent = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    return (
        <div>
            <main className="flex-1 flex flex-col items-center px-4 py-8">
                <div className="w-full max-w-[95vw] sm:max-w-md mt-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-2 text-center">
                        Contáctanos
                    </h1>
                    <p className="text-gray-700 text-center mb-4 text-sm">
                        Si tienes alguna pregunta o comentario, no dudes en
                        ponerte en contacto con nosotros. Estamos aquí para
                        ayudarte.
                    </p>

                    <ContactForm
                        form={form}
                        setForm={setForm}
                        status={status}
                        setStatus={setStatus}
                    />

                    {/* Mail */}
                    <div className="flex flex-col gap-3 mb-8">
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <Mail className="text-blue-600" />
                            <div>
                                <div className="font-bold text-sm">Email</div>
                                <div className="text-xs text-gray-600">
                                    hackathones2025@gmail.com
                                </div>
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <Phone className="text-purple-600" />
                            <div>
                                <div className="font-bold text-sm">
                                    Teléfono
                                </div>
                                <div className="text-xs text-gray-600">
                                    986 09 09 09
                                </div>
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <MapPin className="text-blue-600" />
                            <div>
                                <div className="font-bold text-sm">
                                    Ubicación
                                </div>
                                <div className="text-xs text-gray-600">
                                    <a
                                        href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd2e7d407997464b:0x5ee1171fbad2ceca?sa=X&ved=1t:8290&ictx=111"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        Rúa Nicaragua, 8, 15005 A Coruña
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Horario */}
                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <Clock className="text-purple-600" />
                            <div>
                                <div className="font-bold text-sm">Horario</div>
                                <div className="text-xs text-gray-600">
                                    Lunes a Viernes, 9:00 - 18:00
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactComponent;
