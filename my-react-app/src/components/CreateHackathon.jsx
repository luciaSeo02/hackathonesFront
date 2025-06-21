import { useState, useEffect } from 'react';
import { createHackathon } from '../services/hackathonService';
import { Calendar, MapPin, Globe, Tag, Code, MessageSquarePlus, Upload, Image, FileText } from 'lucide-react';
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
        technologyNames: [],
    });

    const [topics, setTopics] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [topics] = await Promise.all([
                    fetch(`${import.meta.env.VITE_URL_API}/lists/topics`),
                    fetch(`${import.meta.env.VITE_URL_API}/lists/technologies`)
                ]);
                const topicsData = await topics.json();

                setTopics(topicsData.data || []);
            } catch (err) {
                console.error('Error cargando temas o tecnologías', err);
            }
        };

        fetchOptions();
    }, []);

    const handleClose = () => {
        navigate('/hackathons');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
            file,
            id: Date.now() + Math.random(),
            type: file.type.startsWith('image/') ? 'image' : 'document',
            name: file.name,
            size: file.size
        }));
        
        setSelectedFiles(prev => [...prev, ...newFiles]);
        e.target.value = '';
    };

    console.log(selectedFiles);
    

    const removeFile = (fileId) => {
        setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const uploadFiles = async (hackathonId) => {
        if (selectedFiles.length === 0) return;

        const token = localStorage.getItem('token');
        
        for (const fileItem of selectedFiles) {
            const formData = new FormData();
            formData.append('attachment', fileItem.file);
            formData.append('fileType', fileItem.type);

            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/hackathons/${hackathonId}/attachments`,
                {
                    method: 'POST',
                    headers: {
                        'authorization': token
                    },
                    body: formData
                }
            );

            if (!response.ok) {
                const json = await response.json();
                throw new Error(`Error subiendo ${fileItem.name}: ${json.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsUploading(true);

        try {
            const data = {
            ...formData,
            technologyNames: formData.technologyNames
                .split(',')
                .map((tech) => tech.trim())
                .filter(Boolean),
        };

            const response = await createHackathon(data);
            const json = await response.json();
            const hackathonId = json.data?.id || json.hackathonId;

            if (!hackathonId) {
                throw new Error('No se pudo obtener el ID del hackathon creado');
            }

            // Subir archivos si los hay
            if (selectedFiles.length > 0) {
                await uploadFiles(hackathonId);
            }

            setSuccess(`Hackathon creado correctamente${selectedFiles.length > 0 ? ' con archivos adjuntos' : ''}.`);
            
            setFormData({
                name: '',
                description: '',
                modality: 'online',
                location: '',
                onlineUrl: '',
                startDate: '',
                endDate: '',
                topicName: '',
                technologyNames: [],
            });
            setSelectedFiles([]);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient flex items-center justify-center">
            <div className="w-full flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-4 lg:w-[800px] max-h-[90vh] overflow-y-auto no-scrollbar">

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
                                <option value="">Selecciona una modalidad</option>
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
                            <select
                                name="topicName"
                                value={formData.topicName}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Selecciona un tema</option>
                                {topics.map((topic) => (
                                    <option key={topic.id} value={topic.name}>{topic.name}</option>
                                ))}
                            </select>
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

                        {/* Subida de archivos */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Archivos adjuntos
                            </label>
                            
                            {/* Botón de subida */}
                            <div className="relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf,.doc,.docx,.zip"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex items-center justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl hover:bg-gray-100 transition-colors">
                                    <div className="text-center">
                                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">
                                            Arrastra archivos aquí o haz clic para seleccionar
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Imágenes (JPG, PNG, WebP) y documentos (PDF, DOC, DOCX, ZIP)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lista de archivos seleccionados */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-700">
                                        Archivos seleccionados ({selectedFiles.length})
                                    </p>
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                        {selectedFiles.map((fileItem) => (
                                            <div key={fileItem.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    {fileItem.type === 'image' ? (
                                                        <Image className="h-5 w-5 text-blue-500" />
                                                    ) : (
                                                        <FileText className="h-5 w-5 text-green-500" />
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                                                            {fileItem.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatFileSize(fileItem.size)} • {fileItem.type === 'image' ? 'Imagen' : 'Documento'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(fileItem.id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <ButtonBig 
                            type="submit" 
                            text={isUploading ? "Creando hackathon..." : "Crear hackathon"} 
                            disabled={isUploading}
                        />

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