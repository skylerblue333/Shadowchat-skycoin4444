// AUTO-GENERATED DRAFT SCREEN: HelpWebinarsScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { trpc } from './utils/trpc';
import { Switch } from './components/ui/switch'; // Assuming shadcn/ui Switch component
import { Label } from './components/ui/label'; // Assuming shadcn/ui Label component

// Define tRPC types (example - these would typically come from a shared tRPC definition)
interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  link: string;
  speaker: string;
}

// Component Props (if any)
interface HelpWebinarsScreenProps {
  // No specific props for this example, but can be extended
}

const HelpWebinarsScreen: React.FC<HelpWebinarsScreenProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize dark mode from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // tRPC query to fetch webinars
  const { data, isLoading, error } = trpc.webinars.list.useQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground" role="status" aria-live="polite">
        <p className="text-lg">Loading webinars...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-destructive" role="alert" aria-live="assertive">
        <p className="text-lg">Error loading webinars: {error.message}</p>
      </div>
    );
  }

  const webinars = data?.list || [];

  return (
    <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold" id="webinars-heading">Help Webinars</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-labelledby="dark-mode-label"
          />
          <Label htmlFor="dark-mode-toggle" id="dark-mode-label">Dark Mode</Label>
        </div>
      </div>

      {webinars.length === 0 ? (
        <div className="text-center text-muted-foreground" role="region" aria-labelledby="webinars-heading">
          <p>No webinars available at the moment. Please check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-labelledby="webinars-heading">
          {webinars.map((webinar) => (
            <Card key={webinar.id} className="flex flex-col" role="listitem">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{webinar.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Speaker: {webinar.speaker}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-2">{webinar.description}</p>
                <p className="text-muted-foreground mb-4">Date: {new Date(webinar.date).toLocaleDateString()}</p>
                <Button asChild className="w-full">
                  <a href={webinar.link} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${webinar.title} webinar`}>
                    Watch Webinar
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpWebinarsScreen;
