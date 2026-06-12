// AUTO-GENERATED DRAFT SCREEN: HelpExpertsScreen
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Assuming a Spinner component exists or can be created for loading states
const Spinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
  </div>
);

// Mock tRPC hooks and types for demonstration purposes
interface Expert {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
}

interface UseQueryResult<TData, TError> {
  data: TData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: TError | undefined;
}

// Mock tRPC `useQuery` hook
const mockUseQuery = <TData, TError>(queryKey: string[], queryFn: () => Promise<TData>): UseQueryResult<TData, TError> => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<TError | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await queryFn();
        setData(result);
      } catch (err) {
        setIsError(true);
        setError(err as TError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [queryFn]);

  return { data, isLoading, isError, error };
};

// Mock tRPC client structure
const trpc = {
  expert: {
    list: {
      useQuery: (query: { search?: string }) => mockUseQuery<Expert[], Error>(
        ['expert.list', query.search],
        async () => {
          const allExperts: Expert[] = [
            { id: '1', name: 'Alice Johnson', specialty: 'Billing', available: true },
            { id: '2', name: 'Bob Williams', specialty: 'Technical Support', available: false },
            { id: '3', name: 'Charlie Brown', specialty: 'Account Management', available: true },
            { id: '4', name: 'Diana Prince', specialty: 'Security', available: true },
            { id: '5', name: 'Eve Adams', specialty: 'Product Features', available: false },
          ];
          if (query.search) {
            return allExperts.filter(expert =>
              expert.name.toLowerCase().includes(query.search!.toLowerCase()) ||
              expert.specialty.toLowerCase().includes(query.search!.toLowerCase())
            );
          }
          return allExperts;
        }
      ),
    },
  },
};

export function HelpExpertsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: experts, isLoading, isError, error } = trpc.expert.list.useQuery({ search: searchTerm });

  // Determine if dark mode is active (for demonstration, assume a simple check or context)
  const isDarkMode = useMemo(() => {
    // In a real app, this would come from a context or system preference
    return document.documentElement.classList.contains('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Help Experts</h1>

        <Card className="mb-6 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle>Find Your Expert</CardTitle>
            <CardDescription>Search for experts by name or specialty.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <Label htmlFor="search-expert" className="sr-only">Search Experts</Label>
                <Input
                  id="search-expert"
                  type="text"
                  placeholder="Search experts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-50"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center py-8">
            <Spinner />
            <p className="mt-2 text-lg">Loading experts...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-8 text-red-600 dark:text-red-400">
            <p className="text-lg font-semibold">Error loading experts.</p>
            <p className="text-sm">{(error as Error)?.message || 'Please try again later.'}</p>
          </div>
        )}

        {!isLoading && !isError && experts && experts.length === 0 && (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            <p className="text-lg">No experts found matching your search.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && !isError && experts?.map((expert) => (
            <Card key={expert.id} className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{expert.name}</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">{expert.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Status: {' '}
                  <span className={expert.available ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {expert.available ? 'Available' : 'Offline'}
                  </span>
                </p>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700"
                  disabled={!expert.available}
                >
                  Contact {expert.name.split(' ')[0]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HelpExpertsScreen;
