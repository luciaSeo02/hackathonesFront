import contactService from '../services/contactService.js';
import ButtonBig from './ui/ButtonBig.jsx';
import ErrorDiv from './ui/ErrorDiv.jsx';
import Success from './ui/Success.jsx';
import Status from './ui/Status.jsx';

const ContactForm = ({
    form,
    setForm,
    status,
    setStatus,
    error,
    setError,
    success,
    setSuccess,
}) => {
    const inputClass =
        'w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ';

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    setError('');
    setSuccess('');
    setTimeout(() => setStatus(''), 200);
    try {
        console.log('Datos a enviar:', form); 
        await contactService(form);
        setSuccess('¡Mensaje enviado correctamente!');
        setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
        console.error('Error enviando el formulario:', error);
        setError('Error al enviar el mensaje');
    }
};

    return (
        <form onSubmit={handleSubmit} className="space-y-2 ">
            <div>
                <input
                    type="text"
                    name="name"
                    value={form?.name}
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
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Correo electrónico"
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Mensaje"
                    className={inputClass + ' resize-none '}
                    rows="4"
                    required
                />
            </div>
            <ButtonBig type= "submit"  text= "Enviar" />

            {/* Estado */}
            {status && (
                <Status status={status}/>
            )}
            {error && (
                <ErrorDiv error={error} />
            )}
            {success && (
                <Success success={success}/>
            )}
            
        </form>
    );
};


export default ContactForm;
