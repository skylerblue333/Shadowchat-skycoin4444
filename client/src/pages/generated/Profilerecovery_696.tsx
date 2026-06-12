// @ts-nocheck
import React, { useState, useEffect } from 'react';
import * as __ns_react_hook_form_1 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_1 as any);
import * as __ns__hookform_resolvers_zod_2 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_2 as any);
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as __ns_lucide_react_3 from 'lucide-react';
const { Sun, Moon, Loader2 } = (__ns_lucide_react_3 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: ProfileRecovery

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }).min(1, 'Email is required.'),
  recoveryCode: z.string().min(6, { message: 'Recovery code must be at least 6 characters.' }).max(10, { message: 'Recovery code cannot exceed 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock tRPC mutation hook (replace with actual tRPC client setup)
const useRecoverProfile = () => {
  return useStubMutation({
    mutationFn: async (data: FormValues) => {
      // Simulate API call with a delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.email === 'test@example.com' && data.recoveryCode === '123456') {
            resolve({ success: true, message: 'Profile recovered successfully!' });
          } else {
            reject(new Error('Invalid email or recovery code. Please try again.'));
          }
        }, 1500);
      });
    },
  });
};

const ProfileRecovery: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      recoveryCode: '',
    },
  });

  const { mutate, isLoading, isError, isSuccess, error } = useRecoverProfile();

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        reset(); // Clear form on successful recovery
      },
    });
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Profile Recovery</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">Enter your email and recovery code to regain access to your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
                {...register('email')}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p id="email-error" role="alert" className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recoveryCode" className="text-sm font-medium">Recovery Code</Label>
              <Input
                id="recoveryCode"
                type="text"
                placeholder="••••••"
                aria-invalid={errors.recoveryCode ? "true" : "false"}
                aria-describedby="recovery-code-error"
                {...register('recoveryCode')}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.recoveryCode ? 'border-red-500' : ''}`}
              />
              {errors.recoveryCode && <p id="recovery-code-error" role="alert" className="text-sm text-red-500 mt-1">{errors.recoveryCode.message}</p>}
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              disabled={isLoading}
              aria-live="polite"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {isLoading ? 'Recovering...' : 'Recover Profile'}
            </Button>
            {isSuccess && (
              <div role="status" className="text-center text-green-600 dark:text-green-400 mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-700">
                <p className="font-medium">Profile recovered successfully!</p>
                <p className="text-sm">You can now log in with your updated credentials.</p>
              </div>
            )}
            {isError && (
              <div role="alert" className="text-center text-red-600 dark:text-red-400 mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-700">
                <p className="font-medium">Error:</p>
                <p className="text-sm">{error?.message || 'An unexpected error occurred. Please try again.'}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileRecovery;
