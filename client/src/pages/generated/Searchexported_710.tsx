// AUTO-GENERATED DRAFT SCREEN: SearchExported

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Button } from './components/ui/button'; // shadcn/ui button
import { Input } from './components/ui/input'; // shadcn/ui input
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'; // shadcn/ui card
import { Switch } from './components/ui/switch'; // shadcn/ui switch for dark mode
import { Label } from './components/ui/label';
import { Loader2 } from 'lucide-react'; // Lucide icon for loading

interface SearchResult {
  id: string;
  name: string;
  description: string;
  // Add other relevant fields for search results
}

interface SearchExportedProps {
  initialSearchTerm?: string;
}

const SearchExported: React.FC<SearchExportedProps> = ({ initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Simulate tRPC hook for fetching search results
  const { data, isLoading, isError, error, refetch } = useQuery<SearchResult[], Error>(
    ['searchResults', searchTerm],
    async () => {
      // Replace with actual tRPC call: trpc.search.query({ term: searchTerm })
      return new Promise((resolve) => {
        setTimeout(() => {
          if (searchTerm.includes('error')) {
            throw new Error('Failed to fetch search results.');
          }
          const mockResults: SearchResult[] = Array.from({ length: 5 }).map((_, i) => ({
            id: `item-${i}`,
            name: `Result ${searchTerm} ${i + 1}`,
            description: `Description for result ${searchTerm} ${i + 1}.`,
          }));
          resolve(mockResults);
        }, 1000);
      });
    },
    { enabled: searchTerm.length > 2 } // Only fetch if search term is long enough
  );

  const handleSearch = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleExport = useCallback(() => {
    // Simulate export logic
    alert('Exporting search results...');
    // In a real app, this would trigger a tRPC mutation or API call to export data
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Search Exported</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-switch"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-switch">Dark Mode</Label>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-6">
            <Input
              type="text"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
              aria-label="Search input"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Search
            </Button>
            <Button onClick={handleExport} disabled={!data || data.length === 0}>
              Export
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="mr-2 h-8 w-8 animate-spin text-blue-500" />
              <p className="text-lg">Loading search results...</p>
            </div>
          )}

          {isError && (
            <div className="text-red-500 py-4 text-center" role="alert">
              <p className="font-bold">Error:</p>
              <p>{error?.message || 'An unknown error occurred.'}</p>
              <Button onClick={() => refetch()} className="mt-2">Try Again</Button>
            </div>
          )}

          {data && data.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Results ({data.length})</h2>
              {data.map((result) => (
                <Card key={result.id} className="p-4">
                  <h3 className="text-lg font-medium">{result.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{result.description}</p>
                </Card>
              ))}
            </div>
          )}

          {data && data.length === 0 && searchTerm.length > 2 && !isLoading && !isError && (
            <p className="text-center py-8 text-gray-500">No results found for "{searchTerm}".</p>
          )}

          {searchTerm.length <= 2 && !isLoading && !isError && (
            <p className="text-center py-8 text-gray-500">Please enter at least 3 characters to search.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchExported;
