import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateHackathonForm from './CreateHackathonForm.jsx';
import { X, CalendarPlus } from 'lucide-react';

const CreateHackathon = () => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [topics] = await Promise.all([
                    fetch(`${import.meta.env.VITE_URL_API}/lists/topics`),
                    fetch(`${import.meta.env.VITE_URL_API}/lists/technologies`),
                ]);
                const topicsData = await topics.json();
                setTopics(topicsData.data || []);
            } catch (err) {
                console.error('Error cargando temas o tecnologías', err);
            }
        };
        fetchOptions();
    }, []);

    const handleClose = () => navigate('/hackathons');

    return (
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient flex items-center justify-center">
            <div className="w-full flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-4 lg:w-[800px] max-h-[90vh] overflow-y-auto no-scrollbar">

                    {/* Header */}
                    <div className="text-center space-y-2 mb-4 relative">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <div className="bg-neutral-100 size-11 p-2 rounded-md flex justify-center items-center shadow-md lg:size-16 sm:p-5 sm:rounded-lg">
                                <CalendarPlus className="w-5 h-5 sm:w-7 sm:h-7" />
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
                        <h3>Crear Hackathon</h3>
                        <p>Completa los detalles para crear un nuevo hackathon.</p>
                    </div>
                    
                    {/* Formulario */}
                    <CreateHackathonForm
                        topics={topics}
                        setError={setError}
                        setSuccess={setSuccess}
                        error={error}
                        success={success}
                        isUploading={isUploading}
                        setIsUploading={setIsUploading}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateHackathon;