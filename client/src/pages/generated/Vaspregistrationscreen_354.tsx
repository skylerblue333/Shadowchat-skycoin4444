// @ts-nocheck
import React, { useState } from 'react';
import * as __ns_react_hook_form_1 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_1 as any);
import * as __ns__hookform_resolvers_zod_2 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_2 as any);
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: VaspRegistrationScreen


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


const vaspRegistrationSchema = z.object({
  vaspName: z.string().min(2, { message: 'VASP Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  website: z.string().url({ message: 'Invalid URL.' }).optional(),
  country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
  licenseNumber: z.string().optional(),
});

type VaspRegistrationFormValues = z.infer<typeof vaspRegistrationSchema>;

const VaspRegistrationScreen: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === 'dark');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VaspRegistrationFormValues>({
    resolver: zodResolver(vaspRegistrationSchema),
  });

  const registerVasp = useStubMutation();

  const onSubmit = async (data: VaspRegistrationFormValues) => {
    try {
      await registerVasp.mutateAsync(data);
      alert('VASP Registration Successful!');
    } catch (error) {
      console.error('Registration error:', error);
      alert('VASP Registration Failed: ' + (error as Error).message);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkTheme(!isDarkTheme);
  };

  if (registerVasp.isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">VASP Registration</CardTitle>
          <CardDescription>Register your Virtual Asset Service Provider details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="vaspName">VASP Name</Label>
              <Input
                id="vaspName"
                type="text"
                placeholder="Enter VASP Name"
                {...register('vaspName')}
                aria-invalid={errors.vaspName ? 'true' : 'false'}
              />
              {errors.vaspName && <p className="text-red-500 text-sm" role="alert">{errors.vaspName.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <p className="text-red-500 text-sm" role="alert">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                placeholder="Enter Website URL"
                {...register('website')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                placeholder="Enter Country"
                {...register('country')}
                aria-invalid={errors.country ? 'true' : 'false'}
              />
              {errors.country && <p className="text-red-500 text-sm" role="alert">{errors.country.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="licenseNumber">License Number (Optional)</Label>
              <Input
                id="licenseNumber"
                type="text"
                placeholder="Enter License Number"
                {...register('licenseNumber')}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
              <Switch
                id="dark-mode-toggle"
                checked={isDarkTheme}
                onCheckedChange={handleThemeToggle}
                aria-label="Toggle dark mode"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || registerVasp.isLoading}>
              {isSubmitting ? 'Submitting...' : 'Register VASP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaspRegistrationScreen;
