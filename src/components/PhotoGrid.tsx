import React from 'react';
import { Trash2, Download } from 'lucide-react';

interface Photo {
  filename: string;
  url: string;
}

interface PhotoGridProps {
  photos: Photo[];
  onDelete: (filename: string) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onDelete }) => {
  const handleDownload = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = `http://localhost:3001${photo.url}`;
    link.download = photo.filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No photos uploaded yet</p>
          <p className="text-gray-400 text-sm mt-2">Upload your first photo to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <div
          key={photo.filename}
          className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={`http://localhost:3001${photo.url}`}
              alt={photo.filename}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-3">
              <button
                onClick={() => handleDownload(photo)}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all duration-200 hover:scale-110"
                title="Download photo"
              >
                <Download size={18} />
              </button>
              <button
                onClick={() => onDelete(photo.filename)}
                className="bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                title="Delete photo"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          {/* Photo info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-medium truncate">
              {photo.filename}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;