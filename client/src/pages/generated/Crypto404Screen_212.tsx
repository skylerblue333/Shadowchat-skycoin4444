// AUTO-GENERATED DRAFT SCREEN: Crypto404Screen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
          <h1 className="text-4xl font-bold">Something went wrong.</h1>
          <p className="text-lg">Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Crypto404Screen: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Example tRPC hook (assuming a 'crypto' router with a 'getNonExistent' query)
  const { data, isLoading, isError, error } = trpc.crypto.getNonExistent.useQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-4xl font-bold">Error: {error.message}</h1>
        <p className="text-lg">Failed to fetch crypto data.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-6xl font-extrabold text-primary">404</CardTitle>
            <CardDescription className="text-xl mt-2">Page Not Found</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">
              The crypto asset you are looking for does not exist or has been moved.
            </p>
            <Button onClick={() => window.history.back()} className="w-full">
              Go Back
            </Button>
            <Button variant="outline" onClick={toggleTheme} className="w-full">
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              <span className="ml-2">Toggle Theme</span>
            </Button>
            {/* Example of data from tRPC, if any, though for a 404 it's unlikely to be useful */}
            {data && (
              <div className="text-sm text-muted-foreground">
                <p>Debug Info (if available):</p>
                <pre className="whitespace-pre-wrap text-left">{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default Crypto404Screen;
