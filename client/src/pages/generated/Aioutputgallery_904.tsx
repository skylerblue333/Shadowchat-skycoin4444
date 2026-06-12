// AUTO-GENERATED DRAFT SCREEN: AIOutputGallery
import React from 'react';
import { useQuery } from '@trpc/react-query'; // Placeholder for tRPC hook
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Placeholder for shadcn/ui Card
import { Button } from './ui/button'; // Placeholder for shadcn/ui Button
import { Skeleton } from './ui/skeleton'; // Placeholder for shadcn/ui Skeleton
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // Placeholder for shadcn/ui Alert
import { SunIcon, MoonIcon, RefreshCcw } from 'lucide-react'; // Placeholder for Lucide icons

interface AIOutput {
  id: string;
  type: 'image' | 'text';
  content: string;
  timestamp: string;
}

// Placeholder for tRPC API client
const trpc = {
  ai: {
    getOutputs: useQuery, // Mocking useQuery for demonstration
  },
};

const AIOutputGallery: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const { data, isLoading, isError, error, refetch } = trpc.ai.getOutputs([
    'aiOutputs',
    { limit: 10 },
  ]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error loading AI outputs</AlertTitle>
          <AlertDescription>{error?.message || 'An unknown error occurred.'}</AlertDescription>
          <Button onClick={() => refetch()} className="mt-2">
            <RefreshCcw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkTheme ? 'dark' : ''}`}>
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">AI Output Gallery</h1>
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkTheme ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </Button>
      </header>
      <main className="p-4">
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((output: AIOutput) => (
              <Card key={output.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Output ID: {output.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  {output.type === 'image' ? (
                    <img
                      src={output.content}
                      alt={`AI Generated Image ${output.id}`}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground line-clamp-3">{output.content}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">{new Date(output.timestamp).toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <p>No AI outputs to display yet.</p>
            <Button onClick={() => refetch()} className="mt-4">
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh Outputs
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIOutputGallery;
