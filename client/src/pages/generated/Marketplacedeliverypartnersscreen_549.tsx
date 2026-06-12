// AUTO-GENERATED DRAFT SCREEN: MarketplaceDeliveryPartnersScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Skeleton } from './components/ui/skeleton';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

interface DeliveryPartner {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  rating: number;
  deliveryCount: number;
}

const MarketplaceDeliveryPartnersScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'deliveryCount'>('name');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error } = trpc.deliveryPartners.list.useQuery();

  const filteredAndSortedPartners = data
    ?.filter(partner =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating; // Descending
      } else if (sortBy === 'deliveryCount') {
        return b.deliveryCount - a.deliveryCount; // Descending
      }
      return 0;
    });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400" role="alert">
        <h2 className="text-lg font-semibold">Error loading delivery partners:</h2>
        <p>{error.message}</p>
        <Button onClick={() => trpc.deliveryPartners.list.refetch()} className="mt-2">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Delivery Partners</h1>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select onValueChange={(value: 'name' | 'rating' | 'deliveryCount') => setSortBy(value)} defaultValue={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="deliveryCount">Delivery Count</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedPartners?.map((partner: DeliveryPartner) => (
          <Card key={partner.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{partner.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Status: <span className={`font-medium ${partner.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{partner.status}</span></p>
              <p>Rating: {partner.rating.toFixed(1)} ⭐</p>
              <p>Deliveries: {partner.deliveryCount}</p>
              <Button className="w-full mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceDeliveryPartnersScreen;
