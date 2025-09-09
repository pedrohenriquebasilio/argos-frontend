import { Photo } from '@/types/api';
import { useState } from 'react';
import { X } from 'lucide-react';

interface PhotoGridProps {
  photos: Photo[];
}

export const PhotoGrid = ({ photos }: PhotoGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 pb-20">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full rounded-lg"
            />
            <p className="text-white text-center mt-4 text-sm">
              {selectedPhoto.title}
            </p>
          </div>
        </div>
      )}
    </>
  );
};