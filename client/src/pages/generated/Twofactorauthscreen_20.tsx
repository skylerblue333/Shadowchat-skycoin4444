// AUTO-GENERATED DRAFT SCREEN: TwoFactorAuthScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup

const formSchema = z.object({
  code: z.string().min(6, { message: 'Code must be 6 digits.' }).max(6, { message: 'Code must be 6 digits.' }),
});

type FormData = z.infer<typeof formSchema>;

export function TwoFactorAuthScreen() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Simulate dark theme toggle

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Simulate tRPC mutation
  const verify2FAMutation = trpc.auth.verify2FA.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Two-factor authentication verified.',
      });
      setIsLoading(false);
      // Redirect or close modal
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to verify 2FA.',
        variant: 'destructive',
      });
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: FormData) => {
    verify2FAMutation.mutate({ code: data.code });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Two-Factor Authentication</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">Please enter the 6-digit code from your authenticator app.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="code" className="sr-only">Verification Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter code"
              {...register('code')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              aria-invalid={errors.code ? 'true' : 'false'}
            />
            {errors.code && <p className="text-red-500 text-sm mt-1" role="alert">{errors.code.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="underline hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            aria-label="Toggle dark theme"
          >
            Toggle Dark Theme
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Twofactorauthscreen_20() { return null; }
