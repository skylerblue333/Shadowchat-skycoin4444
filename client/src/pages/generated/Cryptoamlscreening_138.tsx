// AUTO-GENERATED DRAFT SCREEN: CryptoAmlScreening
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Switch } from '@/components/ui/switch'; // shadcn/ui Switch for dark mode
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react'; // Example icon

// Mock tRPC hook for demonstration
const trpc = {
  crypto: {
    amlScreening: {
      useQuery: (params: { id: string }) => {
        const { data, isLoading, error } = useQuery<any, Error>({ queryKey: ['amlScreening', params.id], queryFn: async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          if (params.id === 'error-test') throw new Error('Failed to fetch AML data');
          return { id: params.id, status: 'Cleared', riskScore: 10, lastUpdated: new Date().toLocaleString() };
        } });
        return { data, isLoading, error };
      },
    },
  },
};

interface CryptoAmlScreeningProps {
  cryptoId: string;
}

const CryptoAmlScreening: React.FC<CryptoAmlScreeningProps> = ({ cryptoId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, error } = trpc.crypto.amlScreening.useQuery({ id: cryptoId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p>Loading AML Screening data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Crypto: AML Screening</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AML Screening Details for {data?.id}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Status:</p>
            <p className="text-sm text-muted-foreground">{data?.status}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Risk Score:</p>
            <p className="text-sm text-muted-foreground">{data?.riskScore}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Last Updated:</p>
            <p className="text-sm text-muted-foreground">{data?.lastUpdated}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoAmlScreening;
