// AUTO-GENERATED DRAFT SCREEN: MarketplacePhysicalProducts
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Input } from '@/components/ui/input'; // shadcn/ui input
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { Switch } from '@/components/ui/switch'; // shadcn/ui switch for dark mode
import { Label } from '@/components/ui/label';

// Mock tRPC client for demonstration. In a real app, this would be generated.
const trpc = {
  product: {
    list: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Math.random() < 0.1) throw new Error('Failed to fetch products');
      return Array.from({ length: 10 }, (_, i) => ({
        id: `prod-${i}`,
        name: `Product ${i + 1}`,
        price: (i + 1) * 10.5,
        description: `Description for product ${i + 1}`,
      }));
    },
  },
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const MarketplacePhysicalProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const { data: products, isLoading, isError, error, refetch } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: trpc.product.list,
  });

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <p>Error: {error?.message || 'Something went wrong'}</p>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Physical Products Marketplace</h1>

        <div className="flex justify-between items-center mb-6">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            aria-label="Search products"
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        {filteredProducts && filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">No products found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full">Add to Cart</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePhysicalProducts;
