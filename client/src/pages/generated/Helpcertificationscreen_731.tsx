// AUTO-GENERATED DRAFT SCREEN: HelpCertificationScreen

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sun, Moon, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button'; // Assuming shadcn/ui button component
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'; // Assuming shadcn/ui card components

// Mock tRPC client for demonstration. In a real app, this would be imported from your tRPC setup.
const trpc = {
  help: {
    getCertificationStatus: async (): Promise<{ status: string; message: string }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const success = Math.random() > 0.2; // Simulate 80% success rate
          if (success) {
            resolve({ status: 'certified', message: 'Your certification is active and valid.' });
          } else {
            resolve({ status: 'pending', message: 'Your certification is pending review.' });
          }
        }, 1500);
      });
    },
  },
};

interface HelpCertificationScreenProps {}

const HelpCertificationScreen: React.FC<HelpCertificationScreenProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['certificationStatus'],
    queryFn: () => trpc.help.getCertificationStatus(),
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Help Certification</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 py-8" role="status" aria-live="polite">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg">Loading certification status...</p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8 text-destructive" role="alert" aria-live="assertive">
              <AlertCircle className="h-12 w-12" />
              <p className="text-xl font-semibold">Error loading certification!</p>
              <p className="text-sm text-muted-foreground">{(error as Error).message || 'Please try again later.'}</p>
              <Button onClick={() => refetch()} className="mt-4">Retry</Button>
            </div>
          )}

          {data && !isLoading && !isError && (
            <div className="space-y-4 py-8">
              <p className="text-2xl font-semibold">Status: <span className={`${data.status === 'certified' ? 'text-green-500' : 'text-yellow-500'}`}>{data.status.toUpperCase()}</span></p>
              <p className="text-md text-muted-foreground">{data.message}</p>
              <Button onClick={() => refetch()} className="mt-4">Refresh Status</Button>
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-6">
            For more information on SKYCOIN4444 certification, please refer to our official documentation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCertificationScreen;
