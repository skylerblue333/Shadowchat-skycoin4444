// AUTO-GENERATED DRAFT SCREEN: SocialMessageSearch
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// Placeholder for tRPC hooks
const trpc = {
  message: {
    search: (query: string) => new Promise<string[]>((resolve) => {
      setTimeout(() => {
        if (query.includes('error')) {
          throw new Error('Failed to fetch messages');
        }
        const results = [
          `Result for '${query}' 1`,
          `Result for '${query}' 2`,
          `Result for '${query}' 3`,
        ];
        resolve(results);
      }, 1000);
    }),
  },
};

interface SocialMessageSearchProps {
  initialQuery?: string;
}

const SocialMessageSearch: React.FC<SocialMessageSearchProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const data = await trpc.message.search(query);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 dark:bg-gray-900 dark:text-gray-100">
      <Card className="w-full max-w-md mx-auto shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Message Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="search-query">Search Query</Label>
              <Input
                id="search-query"
                type="text"
                placeholder="Enter your search query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Message search query input"
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>

            {error && (
              <p className="text-red-500 text-sm text-center" role="alert">
                Error: {error}
              </p>
            )}

            {results.length > 0 && (
              <div className="mt-4 border-t pt-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {results.map((result, index) => (
                    <li key={index} className="dark:text-gray-300">
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {loading && results.length === 0 && !error && (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading results...</p>
            )}

            {!loading && results.length === 0 && !error && query && (
              <p className="text-center text-gray-500 dark:text-gray-400">No results found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMessageSearch;
