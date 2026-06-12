// AUTO-GENERATED DRAFT SCREEN: HelpHelpSearch
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Sun, Moon, Search, XCircle } from 'lucide-react';

type HelpArticle = {
  id: string;
  title: string;
  content: string;
};

interface HelpHelpSearchProps {
  initialSearchTerm?: string;
}

const HelpHelpSearch: React.FC<HelpHelpSearchProps> = ({ initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data, isLoading, isError, error, refetch } = trpc.help.search.useQuery(
    { query: searchTerm },
    { enabled: searchTerm.length > 2 }
  );

  const handleSearch = useCallback(() => {
    if (searchTerm.length > 2) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Help Search</h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkTheme ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </header>

        <div className="flex space-x-2 mb-6">
          <Input
            type="text"
            placeholder="Search for help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow"
            aria-label="Search input"
          />
          <Button onClick={handleSearch} disabled={searchTerm.length <= 2} aria-label="Perform search">
            <Search className="h-5 w-5 mr-2" /> Search
          </Button>
          {searchTerm && (
            <Button variant="ghost" onClick={() => setSearchTerm('')} aria-label="Clear search">
              <XCircle className="h-5 w-5" />
            </Button>
          )}
        </div>

        {isLoading && (
          <Card className="mb-4">
            <CardContent className="p-4 text-center">Loading help articles...</CardContent>
          </Card>
        )}

        {isError && (
          <Card className="mb-4 border-red-500 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">Error</CardTitle>
            </CardHeader>
            <CardContent className="text-red-600">Failed to load articles: {error?.message}</CardContent>
          </Card>
        )}

        {data && data.length === 0 && searchTerm.length > 2 && (
          <Card className="mb-4">
            <CardContent className="p-4 text-center">No articles found for "{searchTerm}".</CardContent>
          </Card>
        )}

        {data && data.length > 0 && (
          <div className="space-y-4">
            {data.map((article) => (
              <Card key={article.id} className="shadow-sm">
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{article.content.substring(0, 200)}...</p>
                  {/* In a real app, this would link to the full article */}
                  <Button variant="link" className="p-0 mt-2">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!searchTerm && (
          <Card className="mb-4">
            <CardContent className="p-4 text-center">Start typing to search for help articles.</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HelpHelpSearch;
