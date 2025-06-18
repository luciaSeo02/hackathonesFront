import { useState } from 'react';
import { createHackathon } from '../services/hackathonService';
import { Calendar, MapPin, Globe, Tag, Code, MessageSquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import ButtonBig from './ui/ButtonBig.jsx';
import ErrorDiv from './ui/ErrorDiv.jsx';
import Success from './ui/Success.jsx';


function CreateHackathon() {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        modality: '',
        location: '',
        onlineUrl: '',
        startDate: '',
        endDate: '',
        topicName: '',
        technologyNames: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/hackathons');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const data = {
            ...formData,
            technologyNames: formData.technologyNames
                .split(',')
                .map((tech) => tech.trim())
                .filter(Boolean),
        };

        try {
            await createHackathon(data);
            setSuccess('Hackathon creado correctamente.');
            setFormData({
                name: '',
                description: '',
                modality: 'online',
                location: '',
                onlineUrl: '',
                startDate: '',
                endDate: '',
                topicName: '',
                technologyNames: '',
            });

        } catch (error) {
            setError(error.message);

        }
    };

    

    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient flex items-center justify-center">
            <div className="w-full flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-4 lg:w-[800px]">

                    {/* Header */}
                    <div className="text-center space-y-2 mb-4 relative">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <div className="w-8 h-8 bg-light-gradient dark:bg-dark-gradient rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg font-bold">
                                    <MessageSquarePlus className="h-5 w-5" />
                                </span>
                            </div>
                        </div>
                        <div className="absolute top-1 right-3">
                            <X
                                onClick={handleClose}
                                width="25"
                                height="25"
                                fill="none"
                                stroke="#5F3DC4"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Crear Hackathon</h1>
                        <p className="text-gray-500 text-sm">
                            Completa los detalles para crear un nuevo hackathon.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        
                        {/* Nombre */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Tag className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del hackathon"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Descripción */}
                        <div className="relative">
                            <textarea
                                name="description"
                                placeholder="Descripción del evento"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Modalidad */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Globe className="h-5 w-5 text-blue-500" />
                            </div>
                            <select 
                                name="modality" 
                                value={formData.modality} 
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none cursor-pointer"
                            >
                                <option value="online">Online</option>
                                <option value="onsite">Presencial</option>
                            </select>
                        </div>

                        {/* Ubicación */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                placeholder="Ubicación (opcional)"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        {/* URL Online */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Globe className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="url"
                                name="onlineUrl"
                                placeholder="URL del evento online"
                                value={formData.onlineUrl}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Fechas */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Tema */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Tag className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                name="topicName"
                                placeholder="Tema principal"
                                value={formData.topicName}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Tecnologías */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Code className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="text"
                                name="technologyNames"
                                placeholder="Tecnologías (separadas por coma)"
                                value={formData.technologyNames}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Submit Button */}
                        <ButtonBig type="submit" text="Crear hackathon" />

                        {/* Messages */}
                        {error && (
                            <ErrorDiv error={error} />
                        )}
                        {success && (
                            <Success success={success}/>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateHackathon;
