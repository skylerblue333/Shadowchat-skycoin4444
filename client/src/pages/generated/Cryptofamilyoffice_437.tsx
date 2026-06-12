// AUTO-GENERATED DRAFT SCREEN: CryptoFamilyOffice
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert for error handling
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'; // Example icons for theme toggle
import { Button } from '@/components/ui/button'; // shadcn/ui Button

interface FamilyOfficeData {
  id: string;
  name: string;
  totalAssets: number;
  holdings: Array<{ asset: string; amount: number; value: number }>;
}

const CryptoFamilyOffice: React.FC = () => {
  const { data, isLoading, error } = trpc.familyOffice.getFamilyOfficeData.useQuery();

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load family office data: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto: Family Office</h1>
        <Button variant="outline" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overview for {data?.name || 'Family Office'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">Total Assets: ${data?.totalAssets.toLocaleString() || 'N/A'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.holdings && data.holdings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Asset</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Value (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.holdings.map((holding, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2">{holding.asset}</td>
                      <td className="py-2">{holding.amount.toLocaleString()}</td>
                      <td className="py-2">${holding.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No holdings to display.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoFamilyOffice;
