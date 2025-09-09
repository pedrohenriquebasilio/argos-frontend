import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchPostComments, createPost, updatePost, deletePost } from '@/services/api';
import { PostCard } from '@/components/Posts/PostCard';
import { PostForm } from '@/components/Posts/PostForm';
import { CommentCard } from '@/components/Posts/CommentCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, MessageCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { Post } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

export const Posts = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['post-comments', selectedPostId],
    queryFn: () => fetchPostComments(selectedPostId!),
    enabled: !!selectedPostId,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setShowForm(false);
      toast({ title: 'Post criado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar post', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Post, 'id'> }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setEditingPost(null);
      setShowForm(false);
      toast({ title: 'Post atualizado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar post', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({ title: 'Post deletado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao deletar post', variant: 'destructive' });
    },
  });

  const handleFormSubmit = (data: { title: string; body: string; userId: number }) => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = (postId: number) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      deleteMutation.mutate(postId);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (selectedPostId) {
    const selectedPost = posts?.find(post => post.id === selectedPostId);
    
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-primary text-white p-4 pb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPostId(null)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold line-clamp-2">{selectedPost?.title}</h1>
              <p className="text-white/80 text-sm">Usuário {selectedPost?.userId}</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 pb-20">
          <div className="bg-card p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedPost?.body}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedPost && handleEdit(selectedPost)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedPost && handleDelete(selectedPost.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-muted-foreground mb-4">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {comments?.length || 0} comentários
            </span>
          </div>

          {commentsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              {comments?.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white p-4 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Posts</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowForm(true)}
            className="text-white hover:bg-white/20"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-white/80">Últimas publicações da comunidade</p>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {showForm && (
          <PostForm
            post={editingPost || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        )}

        {postsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          posts?.slice(0, 20).map((post) => (
            <div key={post.id} className="group relative">
              <PostCard
                post={post}
                onClick={() => setSelectedPostId(post.id)}
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(post);
                  }}
                  className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};