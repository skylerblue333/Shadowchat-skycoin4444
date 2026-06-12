// AUTO-GENERATED DRAFT SCREEN: FanTokenPortal
import React, { useState, useEffect, useCallback } from 'react';
import { trpc } from './trpc/client';
import { cn } from './lib/utils';
import { Sun, Moon, Loader2, AlertCircle, RefreshCw, ArrowRight, Wallet, TrendingUp, Info } from 'lucide-react';

// shadcn/ui components (simplified for this example)
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>{children}</div>
);
const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>
);
const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>{children}</h3>
);
const CardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
);
const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('p-6 pt-0', className)}>{children}</div>
);
const CardFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('flex items-center p-6 pt-0', className)}>{children}</div>
);
const Button = ({ children, className, onClick, variant = 'default', size = 'default', ...props }: { children: React.ReactNode; className?: string; onClick?: () => void; variant?: 'default' | 'outline' | 'ghost' | 'link'; size?: 'default' | 'icon' | 'sm' | 'lg'; [key: string]: any }) => (
  <button
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
      variant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
      variant === 'link' && 'text-primary underline-offset-4 hover:underline',
      size === 'default' && 'h-10 px-4 py-2',
      size === 'icon' && 'h-10 w-10',
      size === 'sm' && 'h-9 px-3',
      size === 'lg' && 'h-11 px-8',
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

interface FanTokenPortalProps {}

const FanTokenPortal: React.FC<FanTokenPortalProps> = () => {
  // tRPC hook to fetch fan token data
  const { data, isLoading, error, refetch } = trpc.fanTokens.query({ userId: 'user123' });
  // State for managing dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to apply or remove dark mode class from the document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Callback to toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  // Callback to refresh fan token data
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 dark:bg-gray-950 dark:text-gray-50">
        <div className="flex flex-col items-center justify-center py-8" role="status" aria-live="polite">
          <Loader2 className="h-12 w-12 animate-spin text-primary" aria-hidden="true" />
          <p className="mt-4 text-xl text-muted-foreground">Loading fan tokens and portal data...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment while we fetch your assets.</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 dark:bg-gray-950 dark:text-gray-50">
        <div className="flex flex-col items-center justify-center py-8 text-red-500" role="alert" aria-live="assertive">
          <AlertCircle className="h-12 w-12" aria-hidden="true" />
          <p className="mt-4 text-xl">Error loading data: {error.message}</p>
          <p className="text-sm text-muted-foreground">Failed to retrieve fan token information. Please try again.</p>
          <Button onClick={handleRefresh} className="mt-6" aria-label="Try again to load fan tokens">
            <RefreshCw className="h-5 w-5 mr-2" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Render main content
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 dark:bg-gray-950 dark:text-gray-50">
      {/* Dark mode toggle button */}
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-7 w-7 text-primary" /> SKYCOIN4444 Fan Token Portal
          </CardTitle>
          <CardDescription>Manage your exclusive fan tokens and track their real-time market value.</CardDescription>
        </CardHeader>
        <CardContent>
          {data && data.length > 0 ? (
            <div className="space-y-6">
              {data.map((token) => (
                <div key={token.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors duration-200 ease-in-out">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-xl font-semibold">{token.name} ({token.symbol})</p>
                      <p className="text-sm text-muted-foreground">Balance: <span className="font-medium">{token.balance}</span></p>
                    </div>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <p className="text-xl font-bold text-primary">${token.valueUSD.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Current Value</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Info className="h-10 w-10 text-blue-500" aria-hidden="true" />
              <p className="mt-4 text-xl text-muted-foreground">No fan tokens found.</p>
              <p className="text-sm text-muted-foreground text-center">It looks like you haven't acquired any fan tokens yet. Start exploring to support your favorite creators!</p>
              <Button onClick={handleRefresh} className="mt-6" aria-label="Refresh fan token data">
                <RefreshCw className="h-5 w-5 mr-2" /> Refresh Data
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
          <Button variant="link" className="text-base" aria-label="Learn more about fan tokens">
            Learn More About Fan Tokens <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button className="text-base" aria-label="View all transactions">
            View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Accessibility note */}
      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        This portal is designed with accessibility in mind, ensuring a seamless experience for all users.
        Keyboard navigation and screen reader compatibility are prioritized.
      </p>
    </div>
  );
};

export default FanTokenPortal;