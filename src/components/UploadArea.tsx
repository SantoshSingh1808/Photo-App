import React, { useCallback, useState } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';

interface UploadAreaProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onUpload, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await onUpload(selectedFile);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="mb-8">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center">
            <div className={`p-4 rounded-full mb-4 transition-colors ${
              dragActive ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Upload className={`w-8 h-8 ${
                dragActive ? 'text-blue-600' : 'text-gray-500'
              }`} />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {dragActive ? 'Drop your photo here' : 'Upload a photo'}
            </h3>
            
            <p className="text-gray-500 mb-4">
              Drag and drop an image, or click to browse
            </p>
            
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Choose File
            </button>
            
            <p className="text-xs text-gray-400 mt-3">
              Supports: JPG, PNG, GIF, WebP (max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </h4>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
              
              <button
                onClick={removeSelectedFile}
                disabled={isUploading}
                className="text-gray-400 hover:text-gray-600 disabled:text-gray-300 p-2 rounded-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;