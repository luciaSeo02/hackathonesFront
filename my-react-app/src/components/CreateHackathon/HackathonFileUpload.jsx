import { Upload, Image, FileText, X } from 'lucide-react';
import formatFileSize from '../../services/fileUtils';

const HackathonFileUpload = ({ selectedFiles, setSelectedFiles, removeFile }) => {
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map((file) => ({
            file,
            id: Date.now() + Math.random(),
            type: file.type.startsWith('image/') ? 'image' : 'document',
            name: file.name,
            size: file.size,
        }));
        setSelectedFiles([...selectedFiles, ...newFiles]);
        e.target.value = '';
    };

    return (
        <div className="space-y-2">
            <label className="block mt-4 text-sm font-semibold">
                Archivos adjuntos
            </label>
            <div className="relative w-full">
                <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.zip"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
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
            {selectedFiles.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                        Archivos seleccionados ({selectedFiles.length})
                    </p>
                    <div className="max-h-32 overflow-y-auto space-y-2">
                        {selectedFiles.map((fileItem) => (
                            <div
                                key={fileItem.id}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    {fileItem.type === 'image' ? (
                                        <Image className="h-5 w-5 text-blue-600" />
                                    ) : (
                                        <FileText className="h-5 w-5 text-green-500" />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                                            {fileItem.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(fileItem.size)} •{' '}
                                            {fileItem.type === 'image' ? 'Imagen' : 'Documento'}
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
    );
}

export default HackathonFileUpload;