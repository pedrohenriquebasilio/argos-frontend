import { Card } from '@/components/ui/card';
import { Album } from '@/types/api';
import { Camera } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}

export const AlbumCard = ({ album, onClick }: AlbumCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-soft transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-border/50"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{album.title}</h3>
          <p className="text-sm text-muted-foreground">Usuário {album.userId}</p>
        </div>
      </div>
    </Card>
  );
};