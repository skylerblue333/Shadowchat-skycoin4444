// AUTO-GENERATED DRAFT SCREEN: OnboardingCreditCheck
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '../utils/trpc';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2 } from 'lucide-react';

const creditCheckSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format (e.g., 123-45-6789)'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid DOB format (e.g., 1990-01-01)'),
});

type CreditCheckFormValues = z.infer<typeof creditCheckSchema>;

const OnboardingCreditCheck: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { mutate, isPending, error } = trpc.creditCheck.useMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<CreditCheckFormValues>({
    resolver: zodResolver(creditCheckSchema),
  });

  const onSubmit = (data: CreditCheckFormValues) => {
    mutate(data, {
      onSuccess: () => {
        alert('Credit check initiated successfully!');
      },
      onError: (err) => {
        console.error('Credit check failed:', err);
        alert('Credit check failed. Please try again.');
      },
    });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Credit Check</CardTitle>
          <CardDescription>Please provide your information to proceed with the credit check.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} className={errors.firstName ? 'border-red-500' : ''} aria-invalid={errors.firstName ? "true" : "false"} />
              {errors.firstName && <p className="text-red-500 text-sm mt-1" role="alert">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} className={errors.lastName ? 'border-red-500' : ''} aria-invalid={errors.lastName ? "true" : "false"} />
              {errors.lastName && <p className="text-red-500 text-sm mt-1" role="alert">{errors.lastName.message}</p>}
            </div>
            <div>
              <Label htmlFor="ssn">Social Security Number</Label>
              <Input id="ssn" {...register('ssn')} placeholder="XXX-XX-XXXX" className={errors.ssn ? 'border-red-500' : ''} aria-invalid={errors.ssn ? "true" : "false"} />
              {errors.ssn && <p className="text-red-500 text-sm mt-1" role="alert">{errors.ssn.message}</p>}
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" {...register('dob')} className={errors.dob ? 'border-red-500' : ''} aria-invalid={errors.dob ? "true" : "false"} />
              {errors.dob && <p className="text-red-500 text-sm mt-1" role="alert">{errors.dob.message}</p>}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>}
            <Button type="submit" className="w-full" disabled={isPending} aria-live="polite">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
              Submit for Credit Check
            </Button>
          </form>
          <Button onClick={toggleTheme} variant="outline" className="mt-4 w-full">
            Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingCreditCheck;
