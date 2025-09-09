import { User } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Mail, Phone, Globe, Building } from 'lucide-react';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              @{user.username}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>{user.phone}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="w-4 h-4" />
          <span>{user.website}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="w-4 h-4" />
          <span>{user.company.name}</span>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            <strong>Endereço:</strong> {user.address.street}, {user.address.suite}<br />
            {user.address.city} - {user.address.zipcode}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};