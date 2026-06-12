// AUTO-GENERATED DRAFT SCREEN: MarketplaceDigitalProducts
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MoonIcon, SunIcon } from 'lucide-react';

interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MarketplaceDigitalProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data: products, isLoading, isError, error } = trpc.digitalProducts.list.useQuery({
    search: searchTerm,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 text-red-500 dark:text-red-400 dark:bg-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Error loading products</h2>
        <p>Error: {error.message}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Digital Product Marketplace</h1>
        <div className="flex items-center space-x-2">
          <SunIcon className="h-5 w-5" />
          <Switch checked={isDarkTheme} onCheckedChange={toggleTheme} id="dark-mode-switch" aria-label="Toggle dark mode" />
          <MoonIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search digital products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 lg:w-1/3"
          aria-label="Search digital products"
        />
      </div>

      {products && products.length === 0 ? (
        <p className="text-center text-lg">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Card key={product.id} className="w-full transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceDigitalProducts;
