import { Card } from '@/components/ui/card';
import { Todo } from '@/types/api';
import { Check, Circle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoCardProps {
  todo: Todo;
  onToggle?: (id: number) => void;
}

export const TodoCard = ({ todo, onToggle }: TodoCardProps) => {
  return (
    <Card className={cn(
      "p-4 transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-border/50",
      todo.completed && "opacity-75"
    )}>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle?.(todo.id)}
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200",
            todo.completed 
              ? "bg-success text-success-foreground" 
              : "border-2 border-muted-foreground hover:border-success"
          )}
        >
          {todo.completed ? (
            <Check className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4 opacity-0" />
          )}
        </button>

        <div className="flex-1">
          <p className={cn(
            "font-medium transition-all duration-200",
            todo.completed 
              ? "text-muted-foreground line-through" 
              : "text-foreground"
          )}>
            {todo.title}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <User className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Usuário {todo.userId}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};