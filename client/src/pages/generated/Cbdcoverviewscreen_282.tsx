// AUTO-GENERATED DRAFT SCREEN: CbdcOverviewScreen
import React from 'react';
import { trpc } from '../trpc';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button'; // Assuming shadcn/ui button component
import { Sun, Moon } from 'lucide-react'; // Assuming lucide-react for icons

const CbdcOverviewScreen: React.FC = () => {
  const { data, isLoading, error } = trpc.cbdc.query();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-xl" aria-live="polite">Loading CBDC Overview data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive-foreground">
        <p className="text-xl" role="alert">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Crypto: CBDC Overview</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
      <p className="text-lg">{data?.message}</p>
      <div className="mt-8 p-4 border rounded-lg bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-4">Key Information</h2>
        <ul className="list-disc list-inside" role="list">
          <li aria-label="Definition of CBDC">Central Bank Digital Currency (CBDC) is a digital form of a country's fiat currency.</li>
          <li aria-label="Issuance of CBDC">It is issued and backed by the central bank.</li>
          <li aria-label="Potential benefits of CBDC">Potential benefits include increased financial inclusion, faster payments, and reduced costs.</li>
          <li aria-label="Challenges of CBDC">Challenges include privacy concerns, cybersecurity risks, and potential impact on commercial banks.</li>
        </ul>
      </div>
    </div>
  );
};

export default CbdcOverviewScreen;
