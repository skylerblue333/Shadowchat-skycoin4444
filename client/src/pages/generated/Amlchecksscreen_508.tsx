// AUTO-GENERATED DRAFT SCREEN: AMLChecksScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock tRPC client setup
const trpc = {
  aml: {
    check: async (data: AMLCheckInput) => {
      return new Promise<AMLCheckResult>((resolve, reject) => {
        setTimeout(() => {
          if (data.nationalId === 'ERROR') {
            reject(new Error('Simulated AML check error.'));
          } else if (data.nationalId === 'RISK') {
            resolve({ status: 'High Risk', details: 'Identified on watchlists.' });
          } else {
            resolve({ status: 'Clear', details: 'No issues found.' });
          }
        }, 2000);
      });
    },
  },
};

// Utility for class names (from shadcn/ui)
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

// Schema for AML check input
const amlCheckSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  nationalId: z.string().min(5, { message: 'National ID must be at least 5 characters.' }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date of birth must be in YYYY-MM-DD format.' }),
});

type AMLCheckInput = z.infer<typeof amlCheckSchema>;

interface AMLCheckResult {
  status: string;
  details: string;
}

const AMLChecksScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [result, setResult] = useState<AMLCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<AMLCheckInput>({
    resolver: zodResolver(amlCheckSchema),
  });

  const onSubmit = async (data: AMLCheckInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await trpc.aml.check(data);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4",
      isDarkTheme ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto: AML Checks</CardTitle>
          <CardDescription>Perform Anti-Money Laundering checks for crypto transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Label htmlFor="dark-mode" className="flex items-center space-x-2 cursor-pointer">
              {isDarkTheme ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <Switch
                id="dark-mode"
                checked={isDarkTheme}
                onCheckedChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
            </Label>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                {...register('fullName')}
                className={errors.fullName ? 'border-red-500' : ''}
                aria-invalid={errors.fullName ? "true" : "false"}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1" role="alert">{errors.fullName.message}</p>}
            </div>

            <div>
              <Label htmlFor="nationalId">National ID</Label>
              <Input
                id="nationalId"
                type="text"
                placeholder="1234567890"
                {...register('nationalId')}
                className={errors.nationalId ? 'border-red-500' : ''}
                aria-invalid={errors.nationalId ? "true" : "false"}
              />
              {errors.nationalId && <p className="text-red-500 text-sm mt-1" role="alert">{errors.nationalId.message}</p>}
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth (YYYY-MM-DD)</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth')}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
                aria-invalid={errors.dateOfBirth ? "true" : "false"}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1" role="alert">{errors.dateOfBirth.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              Perform AML Check
            </Button>
          </form>

          {isLoading && (
            <div className="mt-4 text-center flex items-center justify-center text-blue-500" role="status">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Checking...
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500 text-center" role="alert">
              Error: {error}
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 border rounded-md" role="status">
              <h3 className="font-semibold">AML Check Result:</h3>
              <p>Status: <span className={cn({
                'text-green-500': result.status === 'Clear',
                'text-yellow-500': result.status === 'High Risk',
              })}>{result.status}</span></p>
              <p>Details: {result.details}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AMLChecksScreen;
