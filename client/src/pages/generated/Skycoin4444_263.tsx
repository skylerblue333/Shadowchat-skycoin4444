// AUTO-GENERATED DRAFT SCREEN: SKYCOIN4444
import React, { useState, useEffect } from 'react';
import { useZkSyncData } from './hooks/useZkSyncData';
import { cn } from './lib/utils';
import { Sun, Moon, Loader2, AlertCircle } from 'lucide-react';

// Shadcn/ui components (simplified for direct use)
const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

const CardDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props}>
    {children}
  </p>
);

const SKYCOIN4444: React.FC = () => {
  const { data, isLoading, isError } = useZkSyncData();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading zkSync data...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-destructive-foreground p-4">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold">Error loading data</h2>
        <p className="text-muted-foreground">Please try again later.</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <header className="border-b border-border p-4 flex items-center justify-between bg-card shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight">zkSync Dashboard</h1>
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </header>
      <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardDescription>Total Value Locked</CardDescription>
            <CardTitle>{data?.totalValueLocked}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">The total value of assets currently locked in zkSync.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Transactions per Second</CardDescription>
            <CardTitle>{data?.transactionsPerSecond}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Current transaction throughput on the zkSync network.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Active Wallets</CardDescription>
            <CardTitle>{data?.activeWallets}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Number of unique active wallets interacting with zkSync.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Gas Fees Saved</CardDescription>
            <CardTitle>{data?.gasFeesSaved}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Estimated gas fees saved by users on zkSync compared to Ethereum mainnet.</p>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground bg-card">
        © 2026 SKYCOIN4444. All rights reserved.
      </footer>
    </div>
  );
};

export default SKYCOIN4444;
