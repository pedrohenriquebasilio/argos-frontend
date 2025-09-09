import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '@/services/api';
import { TodoCard } from '@/components/Todos/TodoCard';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Clock } from 'lucide-react';
import { Todo } from '@/types/api';

export const Todos = () => {
  const [completedTodos, setCompletedTodos] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const handleToggleTodo = (id: number) => {
    setCompletedTodos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getFilteredTodos = () => {
    if (!todos) return [];
    
    const todosWithState = todos.map(todo => ({
      ...todo,
      completed: todo.completed || completedTodos.has(todo.id)
    }));

    switch (filter) {
      case 'pending':
        return todosWithState.filter(todo => !todo.completed);
      case 'completed':
        return todosWithState.filter(todo => todo.completed);
      default:
        return todosWithState;
    }
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos?.filter(todo => 
    todo.completed || completedTodos.has(todo.id)
  ).length || 0;
  const totalCount = todos?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white p-4 pb-6">
        <h1 className="text-2xl font-bold mb-2">Todos</h1>
        <p className="text-white/80 mb-4">Gerencie suas tarefas</p>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>{completedCount} concluídas</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{totalCount - completedCount} pendentes</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'pending', label: 'Pendentes' },
            { key: 'completed', label: 'Concluídas' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(key as any)}
              className="text-xs"
            >
              {label}
            </Button>
          ))}
        </div>

        <div className="space-y-3 pb-20">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            filteredTodos.slice(0, 50).map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};