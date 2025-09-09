import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  username: z.string().min(1, 'Username é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  website: z.string().min(1, 'Website é obrigatório'),
  company: z.object({
    name: z.string().min(1, 'Nome da empresa é obrigatório'),
  }),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    suite: z.string().min(1, 'Complemento é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    zipcode: z.string().min(1, 'CEP é obrigatório'),
  }),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User;
  onSubmit: (userData: Omit<User, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const UserForm = ({ user, onSubmit, onCancel, isLoading }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: { name: user.company.name },
      address: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
    } : undefined,
  });

  const handleFormSubmit = (data: UserFormData) => {
    const userData: Omit<User, 'id'> = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
      company: {
        name: data.company.name,
        catchPhrase: user?.company.catchPhrase || '',
        bs: user?.company.bs || '',
      },
      address: {
        street: data.address.street,
        suite: data.address.suite,
        city: data.address.city,
        zipcode: data.address.zipcode,
        geo: user?.address.geo || { lat: '0', lng: '0' },
      },
    };
    onSubmit(userData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register('username')}
                className={errors.username ? 'border-destructive' : ''}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                {...register('phone')}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                {...register('website')}
                className={errors.website ? 'border-destructive' : ''}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company.name">Empresa</Label>
              <Input
                id="company.name"
                {...register('company.name')}
                className={errors.company?.name ? 'border-destructive' : ''}
              />
              {errors.company?.name && (
                <p className="text-sm text-destructive">{errors.company.name.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.street">Rua</Label>
                <Input
                  id="address.street"
                  {...register('address.street')}
                  className={errors.address?.street ? 'border-destructive' : ''}
                />
                {errors.address?.street && (
                  <p className="text-sm text-destructive">{errors.address.street.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.suite">Complemento</Label>
                <Input
                  id="address.suite"
                  {...register('address.suite')}
                  className={errors.address?.suite ? 'border-destructive' : ''}
                />
                {errors.address?.suite && (
                  <p className="text-sm text-destructive">{errors.address.suite.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.city">Cidade</Label>
                <Input
                  id="address.city"
                  {...register('address.city')}
                  className={errors.address?.city ? 'border-destructive' : ''}
                />
                {errors.address?.city && (
                  <p className="text-sm text-destructive">{errors.address.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.zipcode">CEP</Label>
                <Input
                  id="address.zipcode"
                  {...register('address.zipcode')}
                  className={errors.address?.zipcode ? 'border-destructive' : ''}
                />
                {errors.address?.zipcode && (
                  <p className="text-sm text-destructive">{errors.address.zipcode.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : user ? 'Atualizar' : 'Criar'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};