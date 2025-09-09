import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchAlbums, fetchTodos, fetchUsers, createUser, updateUser, deleteUser } from '@/services/api';
import { User } from '@/types/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Login } from './Login';
import { UserCard } from '@/components/Users/UserCard';
import { UserForm } from '@/components/Users/UserForm';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  FileText, 
  Camera, 
  CheckSquare, 
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  Plus,
  ArrowLeft
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  isLoading?: boolean;
}

const StatCard = ({ title, value, icon: Icon, gradient, isLoading }: StatCardProps) => (
  <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-soft transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin text-primary mt-2" />
        ) : (
          <p className="text-2xl font-bold text-foreground mt-1">{value.toLocaleString()}</p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </Card>
);

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'users'>('dashboard');
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: isAuthenticated,
  });

  const { data: albums, isLoading: albumsLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
    enabled: isAuthenticated,
  });

  const { data: todos, isLoading: todosLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    enabled: isAuthenticated,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowUserForm(false);
      toast({
        title: 'Usuário criado!',
        description: 'O usuário foi criado com sucesso.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível criar o usuário.',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: Omit<User, 'id'> }) =>
      updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditingUser(null);
      setShowUserForm(false);
      toast({
        title: 'Usuário atualizado!',
        description: 'O usuário foi atualizado com sucesso.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível atualizar o usuário.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Usuário removido!',
        description: 'O usuário foi removido com sucesso.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível remover o usuário.',
      });
    },
  });

  const handleSubmit = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, userData });
    } else {
      createMutation.mutate(userData);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const completedTodos = todos?.filter(todo => todo.completed).length || 0;
  const completionRate = todos?.length ? Math.round((completedTodos / todos.length) * 100) : 0;

  if (showUserForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-primary text-white p-4 pb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleCancel}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
              </h1>
              <p className="text-white/80">Gerenciamento de usuários</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <UserForm
            user={editingUser || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      </div>
    );
  }

  if (activeView === 'users') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-primary text-white p-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveView('dashboard')}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Usuários</h1>
                <p className="text-white/80">Gerencie os usuários do sistema</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowUserForm(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 pb-20">
          {usersLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Carregando usuários...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users?.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {users && users.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white p-4 pb-6">
        <h1 className="text-2xl font-bold mb-2">Administração</h1>
        <p className="text-white/80">Dashboard com estatísticas do sistema</p>
      </div>

      <div className="p-4 space-y-6 pb-20">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Posts"
            value={posts?.length || 0}
            icon={FileText}
            gradient="bg-gradient-primary"
            isLoading={postsLoading}
          />
          <StatCard
            title="Álbuns"
            value={albums?.length || 0}
            icon={Camera}
            gradient="bg-gradient-secondary"
            isLoading={albumsLoading}
          />
          <StatCard
            title="Todos"
            value={todos?.length || 0}
            icon={CheckSquare}
            gradient="bg-gradient-accent"
            isLoading={todosLoading}
          />
          <div 
            className="cursor-pointer"
            onClick={() => setActiveView('users')}
          >
            <StatCard
              title="Usuários"
              value={users?.length || 0}
              icon={Users}
              gradient="bg-gradient-primary"
              isLoading={usersLoading}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Taxa de Conclusão</h3>
                <p className="text-sm text-muted-foreground">Todos completados</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">{completionRate}%</span>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Atividade Geral</h3>
                <p className="text-sm text-muted-foreground">Resumo do sistema</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">{completedTodos}</p>
                <p className="text-xs text-muted-foreground">Concluídos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {(todos?.length || 0) - completedTodos}
                </p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Sistema Operacional</h3>
                <p className="text-sm text-success">Todos os serviços funcionando</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};