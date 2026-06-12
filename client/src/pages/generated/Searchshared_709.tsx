// AUTO-GENERATED DRAFT SCREEN: SearchShared
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SearchResult {
  id: string;
  title: string;
  description: string;
}

const mockSearchResults: SearchResult[] = [
  { id: '1', title: 'SKYCOIN4444 Project Overview', description: 'A comprehensive overview of the SKYCOIN4444 project.' },
  { id: '2', title: 'Shared Documents for Q3', description: 'Access all shared documents for the third quarter.' },
  { id: '3', title: 'Team Collaboration Guidelines', description: 'Guidelines for effective team collaboration.' },
  { id: '4', title: 'Financial Report 2024', description: 'Annual financial report for the year 2024.' },
  { id: '5', title: 'Marketing Strategy Q4', description: 'Detailed marketing strategy for the fourth quarter.' },
];

const simulateSearchApi = (query: string): Promise<SearchResult[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query.toLowerCase() === 'error') {
        reject(new Error('Failed to fetch search results. Please try again.'));
      } else if (query.trim() === '') {
        resolve([]);
      } else {
        const filteredResults = mockSearchResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filteredResults);
      }
    }, 1000);
  });
};

const SearchShared: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleSearch = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await simulateSearchApi(searchTerm);
      setResults(data);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
          />
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Search Shared Documents</h1>
      
      <div className="flex space-x-2 mb-6 max-w-lg mx-auto">
        <Input
          type="text"
          placeholder="Enter search term (e.g., 'project', 'error' for demo)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
          aria-label="Search input"
        />
        <Button onClick={handleSearch} disabled={isLoading || searchTerm.trim() === ''}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 max-w-lg mx-auto" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {isLoading && <p className="text-center text-muted-foreground">Loading results...</p>}

      {!isLoading && !error && searchTerm.trim() !== '' && results.length === 0 && (
        <p className="text-center text-muted-foreground">No results found for "{searchTerm}".</p>
      )}

      {!isLoading && !error && results.length > 0 && (
        <div className="grid gap-4 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mt-4">Search Results:</h2>
          {results.map((result) => (
            <div key={result.id} className="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
              <h3 className="text-lg font-medium">{result.title}</h3>
              <p className="text-sm text-muted-foreground">{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchShared;
