import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Post } from '@/types/api';
import { X } from 'lucide-react';

interface PostFormProps {
  post?: Post;
  onSubmit: (data: { title: string; body: string; userId: number }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PostForm = ({ post, onSubmit, onCancel, isLoading }: PostFormProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');
  const [userId, setUserId] = useState(post?.userId || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit({ title, body, userId });
    }
  };

  return (
    <Card className="p-4 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {post ? 'Editar Post' : 'Novo Post'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Textarea
            placeholder="Conteúdo do post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div>
          <Input
            type="number"
            placeholder="ID do usuário"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            min="1"
            required
          />
        </div>

        <div className="flex space-x-2">
          <Button
            type="submit"
            disabled={isLoading || !title.trim() || !body.trim()}
            className="flex-1"
          >
            {isLoading ? 'Salvando...' : (post ? 'Atualizar' : 'Criar Post')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};