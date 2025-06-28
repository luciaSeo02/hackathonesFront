import { useState } from 'react';
import { createHackathon } from '../../services/hackathonService';
import HackathonNameInput from './HackathonNameInput.jsx';
import HackathonDescriptionInput from './HackathonDescriptionInput.jsx';
import HackathonModalitySelect from './HackathonModalitySelect.jsx';
import HackathonLocationInput from './HackathonLocationInput.jsx';
import HackathonOnlineUrlInput from './HackathonOnlineUrlInput.jsx';
import HackathonDatesInputs from './HackathonDatesInputs.jsx';
import HackathonTopicSelect from './HackathonTopicSelect.jsx';
import HackathonTechnologiesInput from './HackathonTechnologiesInput.jsx';
import HackathonFileUpload from './HackathonFileUpload.jsx';
import ButtonBig from '../ui/ButtonBig.jsx';
import ErrorDiv from '../ui/ErrorDiv.jsx';
import Success from '../ui/Success.jsx';

const CreateHackathonForm = ({
    topics,
    setError,
    setSuccess,
    error,
    success,
    isUploading,
    setIsUploading,
    navigate,
}) => {
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
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileSelect = (files) => {
        setSelectedFiles(files);
    };

    const removeFile = (fileId) => {
        setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId));
    };

    const uploadFiles = async (hackathonId) => {
        if (selectedFiles.length === 0) return;
        const token = localStorage.getItem('token');
        for (const fileItem of selectedFiles) {
            const formDataFile = new FormData();
            formDataFile.append('attachment', fileItem.file);
            formDataFile.append('fileType', fileItem.type);
            const response = await fetch(
                `${
                    import.meta.env.VITE_URL_API
                }/hackathons/${hackathonId}/attachments`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formDataFile,
                }
            );
            if (!response.ok) {
                const json = await response.json();
                throw new Error(
                    `Error subiendo ${fileItem.name}: ${json.message}`
                );
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
            const json = await createHackathon(data);
            const hackathonId = json.data?.id || json.hackathonId;
            if (!hackathonId)
                throw new Error(
                    'No se pudo obtener el ID del hackathon creado'
                );
            if (selectedFiles.length > 0) await uploadFiles(hackathonId);
            setSuccess(
                `Hackathon creado correctamente${
                    selectedFiles.length > 0 ? ' con archivos adjuntos' : ''
                }.`
            );
            setFormData({
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
            setSelectedFiles([]);
            if (navigate) navigate('/hackathons');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <HackathonNameInput value={formData.name} onChange={handleChange} />
            <HackathonDescriptionInput
                value={formData.description}
                onChange={handleChange}
            />
            <HackathonModalitySelect
                value={formData.modality}
                onChange={handleChange}
            />
            <HackathonLocationInput
                value={formData.location}
                onChange={handleChange}
            />
            <HackathonOnlineUrlInput
                value={formData.onlineUrl}
                onChange={handleChange}
            />
            <HackathonDatesInputs
                startDate={formData.startDate}
                endDate={formData.endDate}
                onChange={handleChange}
            />
            <HackathonTopicSelect
                value={formData.topicName}
                onChange={handleChange}
                topics={topics}
            />
            <HackathonTechnologiesInput
                value={formData.technologyNames}
                onChange={handleChange}
            />
            <HackathonFileUpload
                selectedFiles={selectedFiles}
                setSelectedFiles={handleFileSelect}
                removeFile={removeFile}
            />
            <ButtonBig
                type="submit"
                text={isUploading ? 'Creando hackathon...' : 'Crear hackathon'}
                disabled={isUploading}
            />
            {error && <ErrorDiv error={error} />}
            {success && <Success success={success} />}
        </form>
    );
};

export default CreateHackathonForm;
