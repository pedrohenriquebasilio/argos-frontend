import { Card } from '@/components/ui/card';
import { Comment } from '@/types/api';
import { Mail } from 'lucide-react';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">{comment.name}</h4>
            <p className="text-xs text-muted-foreground">{comment.email}</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {comment.body}
        </p>
      </div>
    </Card>
  );
};