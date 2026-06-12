// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as __ns_lucide_react_1 from 'lucide-react';
const { Loader2, Search, ArrowUpNarrowWide, ArrowDownWideNarrow } = (__ns_lucide_react_1 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: SkycoinMarketplaceSubscriptionProductsScreen

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface SubscriptionProduct {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'annually';
  features: string[];
  description: string;
  isPopular?: boolean;
}

// Mock API call function - simulates a tRPC query
const fetchSubscriptionProducts = async (): Promise<SubscriptionProduct[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Basic Plan', price: 9.99, duration: 'monthly', features: ['Feature A', 'Feature B', '5GB Storage'], description: 'Essential features for everyday use.' },
        { id: '2', name: 'Pro Plan', price: 19.99, duration: 'monthly', features: ['Feature A', 'Feature B', 'Feature C', '50GB Storage', 'Priority Email Support'], description: 'Advanced features for growing teams.', isPopular: true },
        { id: '3', name: 'Premium Plan', price: 29.99, duration: 'annually', features: ['All Pro Features', 'Unlimited Storage', '24/7 Phone Support', 'Dedicated Account Manager'], description: 'Comprehensive solution for large enterprises.' },
        { id: '4', name: 'Developer Plan', price: 14.99, duration: 'monthly', features: ['API Access', 'Sandbox Environment', 'Community Support'], description: 'Tools for developers and innovators.' },
        { id: '5', name: 'Enterprise Plan', price: 99.99, duration: 'annually', features: ['Custom Integrations', 'SLA', 'On-premise Deployment'], description: 'Tailored solutions for large-scale operations.' },
      ]);
    }, 1500);
  });
};

type SortBy = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

const SkycoinMarketplaceSubscriptionProductsScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('name-asc');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Simulate tRPC query for subscription products
  const { data, isLoading, isError, error } = useQuery<SubscriptionProduct[], Error>({
    queryKey: ['subscriptionProducts'],
    queryFn: fetchSubscriptionProducts,
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    retry: 3, // Retry failed requests 3 times
  });

  const filteredAndSortedProducts = useMemo(() => {
    if (!data) return [];

    let products = data.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return products;
  }, [data, searchTerm, sortBy]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" aria-label="Loading content" />
        <span className="sr-only">Loading subscription products...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 dark:bg-gray-900 p-4">
        <h2 className="text-xl font-semibold mb-2">Failed to load subscription products.</h2>
        <p className="text-sm">Error: {error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 drop-shadow-lg">
            Marketplace Subscriptions
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                aria-label="Toggle dark mode theme"
              />
              <Label htmlFor="dark-mode" className="text-lg">Dark Mode</Label>
            </div>
          </div>
        </header>

        <section className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search plans..."
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search subscription plans"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="sort-by" className="text-lg whitespace-nowrap">Sort by:</Label>
            <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
              <SelectTrigger id="sort-by" className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="Sort by" aria-label="Sort subscription plans by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <Card
                key={product.id}
                className={`flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${product.isPopular ? 'border-2 border-sky-500 dark:border-sky-400' : 'border border-gray-200 dark:border-gray-700'}`}
                aria-labelledby={`product-title-${product.id}`}
                aria-describedby={`product-description-${product.id}`}
              >
                <CardHeader className="pb-4">
                  <CardTitle id={`product-title-${product.id}`} className="text-3xl font-bold mb-2 flex items-center">
                    {product.name}
                    {product.isPopular && (
                      <span className="ml-3 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">Popular</span>
                    )}
                  </CardTitle>
                  <CardDescription id={`product-description-${product.id}`} className="text-gray-600 dark:text-gray-400 text-lg">
                    {product.description}
                  </CardDescription>
                  <p className="text-4xl font-extrabold mt-4">
                    ${product.price.toFixed(2)}
                    <span className="text-xl font-medium text-gray-500 dark:text-gray-400"> / {product.duration === 'monthly' ? 'month' : 'year'}</span>
                  </p>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  <ul className="list-none space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-auto w-full py-3 text-lg font-semibold bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white transition-colors duration-200">
                    Choose {product.name}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-xl">No subscription plans found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkycoinMarketplaceSubscriptionProductsScreen;
