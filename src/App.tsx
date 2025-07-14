import React from 'react';
import { Camera, Heart } from 'lucide-react';
import PhotoGrid from './components/PhotoGrid';
import UploadArea from './components/UploadArea';
import { usePhotos } from './hooks/usePhotos';

function App() {
  const { photos, loading, uploading, uploadPhoto, deletePhoto } = usePhotos();

  const handleUpload = async (file: File) => {
    const success = await uploadPhoto(file);
    if (success) {
      // You could add a toast notification here
      console.log('Photo uploaded successfully!');
    } else {
      console.error('Failed to upload photo');
    }
  };

  const handleDelete = async (filename: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      const success = await deletePhoto(filename);
      if (success) {
        console.log('Photo deleted successfully!');
      } else {
        console.error('Failed to delete photo');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PhotoVault</h1>
                <p className="text-sm text-gray-500">Upload and manage your photos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by Bolt</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <section className="mb-12">
          <UploadArea onUpload={handleUpload} isUploading={uploading} />
        </section>

        {/* Photos Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Photos
              {!loading && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({photos.length} {photos.length === 1 ? 'photo' : 'photos'})
                </span>
              )}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading photos...</span>
            </div>
          ) : (
            <PhotoGrid photos={photos} onDelete={handleDelete} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            PhotoVault - A beautiful photo management application
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;