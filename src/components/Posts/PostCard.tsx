import { Card } from '@/components/ui/card';
import { Post } from '@/types/api';
import { MessageCircle, User } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export const PostCard = ({ post, onClick }: PostCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-soft transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-border/50"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-muted-foreground">Usuário {post.userId}</span>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.body}
          </p>
        </div>

        <div className="flex items-center text-muted-foreground">
          <MessageCircle className="w-4 h-4 mr-1" />
          <span className="text-xs">Ver comentários</span>
        </div>
      </div>
    </Card>
  );
};