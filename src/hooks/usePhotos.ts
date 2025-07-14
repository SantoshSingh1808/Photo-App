import { useState, useEffect } from 'react';

interface Photo {
  filename: string;
  url: string;
}

const API_BASE = 'http://localhost:3001/api';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${API_BASE}/photos`);
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchPhotos(); // Refresh the photo list
        return true;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (filename: string) => {
    try {
      const response = await fetch(`${API_BASE}/photos/${filename}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPhotos(); // Refresh the photo list
        return true;
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return {
    photos,
    loading,
    uploading,
    uploadPhoto,
    deletePhoto,
    refreshPhotos: fetchPhotos,
  };
};