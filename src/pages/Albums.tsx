import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbums, fetchAlbumPhotos } from '@/services/api';
import { AlbumCard } from '@/components/Albums/AlbumCard';
import { PhotoGrid } from '@/components/Albums/PhotoGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const Albums = () => {
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  const { data: albums, isLoading: albumsLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });

  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ['album-photos', selectedAlbumId],
    queryFn: () => fetchAlbumPhotos(selectedAlbumId!),
    enabled: !!selectedAlbumId,
  });

  if (selectedAlbumId) {
    const selectedAlbum = albums?.find(album => album.id === selectedAlbumId);
    
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-primary text-white p-4 pb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAlbumId(null)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{selectedAlbum?.title}</h1>
              <p className="text-white/80 text-sm">Usuário {selectedAlbum?.userId}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {photosLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <PhotoGrid photos={photos || []} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white p-4 pb-6">
        <h1 className="text-2xl font-bold mb-2">Álbuns</h1>
        <p className="text-white/80">Explore suas coleções de fotos</p>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {albumsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          albums?.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={() => setSelectedAlbumId(album.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};