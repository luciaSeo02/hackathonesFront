import { useState } from 'react';
import { createHackathon } from '../services/hackathonService';
import { Calendar, MapPin, Globe, Tag, Code } from 'lucide-react';

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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 flex items-center justify-center p-4" 
             style={{ fontFamily: 'Orbitron, monospace' }}>
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg font-bold">+</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Crear Hackathon</h1>
                        <p className="text-gray-500 text-sm">
                            Completa los detalles para crear un nuevo hackathon.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
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
                                <option value="presencial">Presencial</option>
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
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Creando...</span>
                                </div>
                            ) : (
                                'Crear Hackathon'
                            )}
                        </button>

                        {/* Messages */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                                <p className="text-red-600 text-sm text-center">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                                <p className="text-green-600 text-sm text-center">{success}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateHackathon;
