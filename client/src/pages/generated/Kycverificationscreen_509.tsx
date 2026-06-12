// AUTO-GENERATED DRAFT SCREEN: KycVerificationScreen

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

const kycSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
});

type KycFormData = z.infer<typeof kycSchema>;

export function KycVerificationScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
  });

  const kycMutation = trpc.kyc.submitKyc.useMutation();

  const onSubmit = async (data: KycFormData) => {
    try {
      await kycMutation.mutateAsync(data);
      alert('KYC submitted successfully!');
    } catch (error) {
      console.error('KYC submission error:', error);
      alert('Failed to submit KYC. Please try again.');
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  if (kycMutation.isLoading || isSubmitting) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">KYC Verification</CardTitle>
          <CardDescription>Please provide your personal details for verification.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} aria-invalid={errors.firstName ? "true" : "false"} />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} aria-invalid={errors.lastName ? "true" : "false"} />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth (YYYY-MM-DD)</Label>
              <Input id="dob" type="date" {...register('dob')} aria-invalid={errors.dob ? "true" : "false"} />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register('address')} aria-invalid={errors.address ? "true" : "false"} />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register('city')} aria-invalid={errors.city ? "true" : "false"} />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" {...register('zipCode')} aria-invalid={errors.zipCode ? "true" : "false"} />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...register('country')} aria-invalid={errors.country ? "true" : "false"} />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || kycMutation.isLoading}>
              {isSubmitting || kycMutation.isLoading ? 'Submitting...' : 'Submit KYC'}
            </Button>
          </form>
          {kycMutation.isError && (
            <p className="text-red-500 text-sm mt-4 text-center">Error: {kycMutation.error?.message || 'Unknown error'}</p>
          )}
          <div className="flex items-center justify-end space-x-2 mt-4">
            {isDarkTheme ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function Kycverificationscreen_509() { return null; }
