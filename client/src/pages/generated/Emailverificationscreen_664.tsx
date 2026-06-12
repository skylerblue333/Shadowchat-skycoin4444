// AUTO-GENERATED DRAFT SCREEN: EmailVerificationScreen
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const EmailVerificationScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const { mutate, isLoading, isError, error, isSuccess } = trpc.auth.sendVerificationEmail.useMutation();

  const onSubmit = (data: EmailFormValues) => {
    mutate({ email: data.email });
  };

  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center p-4',
      isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    )}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>Enter your email to receive a verification link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className={cn(errors.email && 'border-red-500')}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Verification Email'}
            </Button>
            {isError && (
              <p className="text-red-500 text-sm mt-2">Error: {error?.message || 'Failed to send email.'}</p>
            )}
            {isSuccess && (
              <p className="text-green-500 text-sm mt-2">Verification email sent! Please check your inbox.</p>
            )}
          </form>
          <Button
            variant="ghost"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="mt-4 w-full"
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationScreen;
