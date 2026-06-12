// AUTO-GENERATED DRAFT SCREEN: CryptoRegisterScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useRegister } from '@/lib/trpc/hooks'; // Assuming tRPC hook for registration
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: 'You must accept the terms and conditions.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match.',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof formSchema>;

export function CryptoRegisterScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { mutate: registerUser, isLoading, error } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerUser(values);
  };

  return (
    <div className={cn(
      'flex min-h-screen items-center justify-center p-4',
      isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    )}>
      <div className={cn(
        'w-full max-w-md rounded-lg shadow-lg p-8 space-y-6',
        isDarkTheme ? 'bg-gray-800' : 'bg-white'
      )}>
        <h2 className="text-2xl font-bold text-center">Register for SKYCOIN4444</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              {...form.register('email')}
              className={form.formState.errors.email && 'border-red-500'}
              aria-invalid={form.formState.errors.email ? 'true' : 'false'}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1" role="alert">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...form.register('password')}
              className={form.formState.errors.password && 'border-red-500'}
              aria-invalid={form.formState.errors.password ? 'true' : 'false'}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1" role="alert">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              {...form.register('confirmPassword')}
              className={form.formState.errors.confirmPassword && 'border-red-500'}
              aria-invalid={form.formState.errors.confirmPassword ? 'true' : 'false'}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1" role="alert">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              {...form.register('acceptTerms')}
              aria-invalid={form.formState.errors.acceptTerms ? 'true' : 'false'}
            />
            <Label htmlFor="acceptTerms" className="text-sm">
              I accept the <a href="#" className="text-blue-500 hover:underline">terms and conditions</a>
            </Label>
            {form.formState.errors.acceptTerms && (
              <p className="text-red-500 text-sm mt-1" role="alert">{form.formState.errors.acceptTerms.message}</p>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center" role="alert">Registration failed: {error.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account? <a href="#" className="text-blue-500 hover:underline">Login</a>
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" onClick={() => setIsDarkTheme(!isDarkTheme)}>
            Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Cryptoregisterscreen_83() { return null; }
