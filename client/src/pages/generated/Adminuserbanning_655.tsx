// AUTO-GENERATED DRAFT SCREEN: AdminUserBanning
import React, { useState } from 'react';
import { useForm } from '@hookform/resolvers/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes'; // For dark theme

const userBanSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required.' }),
  reason: z.string().min(1, { message: 'Ban reason is required.' }),
});

type UserBanFormValues = z.infer<typeof userBanSchema>;

const AdminUserBanning: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === 'dark');

  const { register, handleSubmit, formState: { errors } } = useForm<UserBanFormValues>({
    resolver: zodResolver(userBanSchema),
  });

  // Example tRPC mutation (replace with actual tRPC hook)
  const banUserMutation = trpc.admin.banUser.useMutation();

  const onSubmit = async (data: UserBanFormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Banning user:', data);
      // await banUserMutation.mutateAsync(data);
      alert(`User ${data.userId} banned successfully for: ${data.reason}`);
    } catch (error) {
      console.error('Failed to ban user:', error);
      alert('Failed to ban user.');
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin: User Banning</CardTitle>
          <CardDescription>Ban a user from the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter user ID"
                {...register('userId')}
                className={errors.userId ? 'border-red-500' : ''}
              />
              {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Ban</Label>
              <Input
                id="reason"
                type="text"
                placeholder="e.g., Spamming, Policy Violation"
                {...register('reason')}
                className={errors.reason ? 'border-red-500' : ''}
              />
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={isDarkTheme}
                onCheckedChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
            </div>
            <Button type="submit" className="w-full">
              {banUserMutation.isLoading ? 'Banning...' : 'Ban User'}
            </Button>
            {banUserMutation.isError && (
              <p className="text-red-500 text-sm text-center">Error: {banUserMutation.error?.message}</p>
            )}
            {banUserMutation.isSuccess && (
              <p className="text-green-500 text-sm text-center">User banned successfully!</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserBanning;
