// AUTO-GENERATED DRAFT SCREEN: WalletImport
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

// Define the form schema using Zod
const formSchema = z.object({
  privateKey: z.string().min(1, { message: 'Private key is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

const WalletImport: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      // Simulate API call for wallet import
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (data.privateKey === 'invalid') {
        throw new Error('Invalid private key provided.');
      }
      setIsSuccess(true);
      console.log('Wallet imported successfully:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Import Wallet</CardTitle>
          <CardDescription>Enter your private key to import your crypto wallet.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="Enter your private key"
                {...register('privateKey')}
                aria-invalid={errors.privateKey ? "true" : "false"}
              />
              {errors.privateKey && (
                <p className="text-red-500 text-sm" role="alert">{errors.privateKey.message}</p>
              )}
            </div>
            {error && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="default" className="bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Wallet imported successfully!</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Importing...' : 'Import Wallet'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletImport;
