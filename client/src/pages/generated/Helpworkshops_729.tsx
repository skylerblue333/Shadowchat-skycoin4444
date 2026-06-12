// AUTO-GENERATED DRAFT SCREEN: HelpWorkshops
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SunIcon, MoonIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

// Simulated tRPC query function
const fetchWorkshops = async (): Promise<Workshop[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Introduction to Web3',
          description: 'Learn the basics of decentralized applications and blockchain technology.',
          date: '2024-07-15',
          time: '10:00 AM',
          location: 'Online',
        },
        {
          id: '2',
          title: 'Advanced Smart Contracts',
          description: 'Dive deep into Solidity and smart contract development.',
          date: '2024-07-20',
          time: '02:00 PM',
          location: 'Conference Room A',
        },
        {
          id: '3',
          title: 'DeFi and Yield Farming',
          description: 'Explore decentralized finance protocols and yield generation strategies.',
          date: '2024-07-25',
          time: '04:00 PM',
          location: 'Online',
        },
      ]);
    }, 1000);
  });
};

const HelpWorkshops: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data: workshops, isLoading, isError, error } = useQuery<Workshop[], Error>({
    queryKey: ['workshops'],
    queryFn: fetchWorkshops,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading workshops...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 p-4">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mb-4" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Error loading workshops</h2>
        <p className="text-gray-700 dark:text-gray-300 text-center">{error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 ${isDarkMode ? 'dark' : ''}`}>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Help Workshops</h1>
        <div className="flex items-center space-x-2">
          <SunIcon className="h-5 w-5" aria-hidden="true" />
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <MoonIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </header>

      <section aria-labelledby="available-workshops-heading">
        <h2 id="available-workshops-heading" className="text-3xl font-semibold mb-6">Available Workshops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops?.map((workshop) => (
            <Card key={workshop.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{workshop.title}</CardTitle>
                <CardDescription>{workshop.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Date:</strong> {workshop.date}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Time:</strong> {workshop.time}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Location:</strong> {workshop.location}</p>
                <Button className="mt-4 w-full">Register</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HelpWorkshops;
