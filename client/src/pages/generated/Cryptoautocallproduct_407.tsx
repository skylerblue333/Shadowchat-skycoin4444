// AUTO-GENERATED DRAFT SCREEN: CryptoAutocallProduct
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Skeleton } from './components/ui/skeleton';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';

interface AutocallProduct {
  id: string;
  name: string;
  underlyingAsset: string;
  strikePrice: number;
  couponRate: number;
  maturityDate: string;
  status: 'active' | 'matured' | 'called';
}

type AutocallProductResponse = AutocallProduct[];

const CryptoAutocallProduct: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error, refetch } = trpc.autocall.getProducts.useQuery<AutocallProductResponse>();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen text-red-500">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Error Loading Autocall Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Failed to fetch autocall products: {error?.message || 'Unknown error'}</p>
            <Button onClick={handleRefresh}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
        </div>
      </div>
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:text-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Crypto Autocall Products</CardTitle>
          <Button onClick={handleRefresh} variant="outline" aria-label="Refresh products">
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-md dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <div>
                    <p className="text-lg font-semibold">{product.name} ({product.underlyingAsset})</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Strike: ${product.strikePrice.toFixed(2)} | Coupon: {product.couponRate}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Maturity: {new Date(product.maturityDate).toLocaleDateString()}</p>
                  </div>
                  <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : product.status === 'called' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No autocall products available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoAutocallProduct;
