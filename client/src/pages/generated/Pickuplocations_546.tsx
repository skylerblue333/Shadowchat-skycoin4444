// AUTO-GENERATED DRAFT SCREEN: PickupLocations
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, Search, Sun, Moon } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isAvailable: boolean;
}

const PickupLocations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data: locations, isLoading, isError, error } = trpc.locations.getPickupLocations.useQuery({
    search: searchTerm,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load pickup locations: {error?.message}</AlertDescription>
      </Alert>
    );
  }

  const filteredLocations = locations?.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pickup Locations</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-5 w-5" />
          <Switch
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark theme"
          />
          <Moon className="h-5 w-5" />
        </div>
      </div>

      <div className="mb-6 flex items-center space-x-2">
        <Label htmlFor="search" className="sr-only">Search locations</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
          aria-label="Search pickup locations"
        />
        <Button aria-label="Search"><Search className="h-4 w-4" /></Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <Card key={location.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5" />{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{location.address}</p>
                <p>{location.city}, {location.state} {location.zip}</p>
                <p className={`mt-2 font-semibold ${location.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                  {location.isAvailable ? 'Available' : 'Unavailable'}
                </p>
                <Button className="mt-4 w-full" disabled={!location.isAvailable}>Select Location</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No pickup locations found.</p>
        )}
      </div>
    </div>
  );
};

export default PickupLocations;
