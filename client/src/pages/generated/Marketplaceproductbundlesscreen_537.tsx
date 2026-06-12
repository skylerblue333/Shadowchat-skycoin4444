// AUTO-GENERATED DRAFT SCREEN: MarketplaceProductBundlesScreen
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button'; // Assuming shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card
import { Switch } from './ui/switch'; // Assuming shadcn/ui switch for dark mode
import { Label } from './ui/label'; // Assuming shadcn/ui label
import { Loader2 } from 'lucide-react'; // Assuming Lucide icons for loading spinner

// Mock tRPC hook for data fetching
const trpc = {
  productBundles: {
    list: () => new Promise<ProductBundle[]>((resolve) => {
      setTimeout(() => {
        const mockData: ProductBundle[] = [
          { id: '1', name: 'Starter Pack', description: 'Essential tools for beginners.', price: 49.99, products: ['Product A', 'Product B'] },
          { id: '2', name: 'Pro Suite', description: 'Advanced features for power users.', price: 199.99, products: ['Product C', 'Product D', 'Product E'] },
          { id: '3', name: 'Ultimate Bundle', description: 'All-inclusive package with premium support.', price: 499.99, products: ['Product F', 'Product G', 'Product H', 'Product I'] },
        ];
        resolve(mockData);
      }, 1500);
    }),
  },
};

// Mock useTheme hook for dark mode
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

interface ProductBundle {
  id: string;
  name: string;
  description: string;
  price: number;
  products: string[];
}

interface MarketplaceProductBundlesScreenProps {}

const MarketplaceProductBundlesScreen: React.FC<MarketplaceProductBundlesScreenProps> = () => {
  const [bundles, setBundles] = useState<ProductBundle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        setIsLoading(true);
        const data = await trpc.productBundles.list();
        setBundles(data);
      } catch (err) {
        setError('Failed to fetch product bundles.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBundles();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-12 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl" tabIndex={0}>Product Bundles</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading product bundles" />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-destructive p-4 border border-destructive rounded-md" role="alert">
          <p className="font-medium">Error: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
        </div>
      )}

      {!isLoading && !error && bundles.length === 0 && (
        <div className="text-center text-muted-foreground p-4">
          <p>No product bundles available at the moment.</p>
        </div>
      )}

      {!isLoading && !error && bundles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <Card key={bundle.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold" tabIndex={0}>{bundle.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{bundle.description}</p>
                <ul className="list-disc list-inside mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {bundle.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
                <div className="text-3xl font-bold text-primary mb-4" tabIndex={0}>${bundle.price.toFixed(2)}</div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceProductBundlesScreen;
