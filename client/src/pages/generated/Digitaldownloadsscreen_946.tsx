// AUTO-GENERATED DRAFT SCREEN: DigitalDownloadsScreen
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Loader2 } from 'lucide-react';

interface DigitalDownload {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const DigitalDownloadsScreen: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.digitalDownloads.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading digital downloads...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Digital Downloads Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((download: DigitalDownload) => (
          <Card key={download.id}>
            <CardHeader>
              <CardTitle>{download.name}</CardTitle>
              <CardDescription>${download.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={download.imageUrl} alt={download.name} className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{download.description}</p>
              <Button className="w-full">Download</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 border rounded-lg shadow-sm dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch id="dark-mode" />
        </div>
        <div className="mb-4">
          <Label htmlFor="search">Search Downloads</Label>
          <Input id="search" placeholder="Search by name or description..." className="mt-1" />
        </div>
        <Button variant="outline">Apply Filters</Button>
      </div>
    </div>
  );
};

export default DigitalDownloadsScreen;
