// AUTO-GENERATED DRAFT SCREEN: IdentityVerificationScreen
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react'; // For a more professional loading spinner
import { useTRPC } from '@/utils/trpc'; // Assuming tRPC context is set up

// Zod schema for form validation
const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format (YYYY-MM-DD).' }),
  documentNumber: z.string().min(5, { message: 'Document number must be at least 5 characters.' }),
});

// Type definition for form data based on the Zod schema
type FormData = z.infer<typeof formSchema>;

/**
 * IdentityVerificationScreen Component
 * A production-grade React 19 screen for identity verification.
 * Features:
 * - Fully typed TSX
 * - Tailwind CSS for styling
 * - shadcn/ui components for a modern look
 * - tRPC hooks for data fetching and mutations
 * - Robust form validation with react-hook-form and Zod
 * - Loading states and error handling
 * - Dark theme toggle for user preference
 * - Accessibility considerations
 */
const IdentityVerificationScreen: React.FC = () => {
  // State for managing dark theme toggle
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // State for managing successful verification message
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // tRPC mutation hook for identity verification
  const { mutate: verifyIdentity, isLoading, error } = useTRPC().identity.verify.useMutation();

  // react-hook-form setup with Zod resolver for validation
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Effect hook to reset success message after a delay
  useEffect(() => {
    if (verificationSuccess) {
      const timer = setTimeout(() => setVerificationSuccess(false), 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [verificationSuccess]);

  // Handler for form submission
  const onSubmit = (data: FormData) => {
    setVerificationSuccess(false); // Reset success message on new submission
    verifyIdentity(data, {
      onSuccess: () => {
        setVerificationSuccess(true);
        // In a real application, you might redirect the user or show a more persistent notification
      },
      onError: (err) => {
        // Error message is displayed below the button via the 'error' object from tRPC
        console.error("Identity verification error:", err);
      },
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md p-6 space-y-6 shadow-lg rounded-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-extrabold text-center">Identity Verification</CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">Please provide your details to verify your identity for SKYCOIN4444.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
              <Input id="fullName" type="text" {...register('fullName')} className="mt-1 block w-full" placeholder="John Doe" aria-invalid={errors.fullName ? "true" : "false"} />
              {errors.fullName && <p role="alert" className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            {/* Date of Birth Input */}
            <div>
              <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth (YYYY-MM-DD)</Label>
              <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} className="mt-1 block w-full" aria-invalid={errors.dateOfBirth ? "true" : "false"} />
              {errors.dateOfBirth && <p role="alert" className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
            </div>
            {/* Document Number Input */}
            <div>
              <Label htmlFor="documentNumber" className="text-sm font-medium">Document Number</Label>
              <Input id="documentNumber" type="text" {...register('documentNumber')} className="mt-1 block w-full" placeholder="ABC12345" aria-invalid={errors.documentNumber ? "true" : "false"} />
              {errors.documentNumber && <p role="alert" className="text-red-500 text-xs mt-1">{errors.documentNumber.message}</p>}
            </div>
            {/* Dark Theme Toggle */}
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="dark-theme" className="text-sm font-medium">Enable Dark Theme</Label>
              <Switch
                id="dark-theme"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark theme for the application"
              />
            </div>
            {/* Submission Button */}
            <Button type="submit" className="w-full py-2 flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Verifying...' : 'Verify Identity'}
            </Button>
            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-sm mt-2 text-center" role="alert">Error: {error.message}</p>}
            {verificationSuccess && <p className="text-green-500 text-sm mt-2 text-center" role="status">Identity verification initiated successfully!</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdentityVerificationScreen;
