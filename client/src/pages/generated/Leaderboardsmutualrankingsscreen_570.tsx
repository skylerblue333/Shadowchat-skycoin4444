// AUTO-GENERATED DRAFT SCREEN: LeaderboardsMutualRankingsScreen

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown, XCircle, Search, Trophy } from 'lucide-react';

interface RankingItem {
  id: string;
  name: string;
  rank: number;
  score: number;
  avatarUrl?: string;
}

type SortOrder = 'asc' | 'desc';
type SortKey = keyof RankingItem;

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

const MOCK_RANKINGS: RankingItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  rank: i + 1,
  score: 1250 - (i * 20),
  avatarUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

const useQuery = (queryKey: string[]) => {
  const [data, setData] = useState<RankingItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true); setIsError(false); setError(null);
    const timer = setTimeout(() => {
      if (queryKey[0] === 'leaderboards.getMutualRankings') {
        if (Math.random() < 0.1) { setIsError(true); setError(new Error('Failed to fetch rankings.')); setData([]); }
        else { setData(MOCK_RANKINGS); }
      } else { setIsError(true); setError(new Error('Unknown tRPC query.')); setData([]); }
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [queryKey]);
  return { data, isLoading, isError, error };
};

const LeaderboardsMutualRankingsScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[0]);

  const { data, isLoading, isError, error } = useQuery([`leaderboards.getMutualRankings`]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, itemsPerPage]);

  const sortedRankings = useCallback((items: RankingItem[]) => {
    return [...items].sort((a, b) => {
      const aValue = a[sortKey]; const bValue = b[sortKey];
      if (typeof aValue === 'number' && typeof bValue === 'number') return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      if (typeof aValue === 'string' && typeof bValue === 'string') return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      return 0;
    });
  }, [sortKey, sortOrder]);

  const filteredAndPaginatedRankings = useMemo(() => {
    const allRankings: RankingItem[] = data || [];
    const filtered = allRankings.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const sorted = sortedRankings(filtered);
    const totalPages = Math.ceil(sorted.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
    else if (currentPage === 0 && totalPages > 0) setCurrentPage(1);

    return { paginated: sorted.slice(startIndex, endIndex), totalItems: sorted.length, totalPages };
  }, [data, searchTerm, currentPage, sortedRankings, itemsPerPage]);

  const { paginated: rankings, totalItems, totalPages } = filteredAndPaginatedRankings;

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));
  const handleSortChange = (value: string) => { const [key, order] = value.split(':') as [SortKey, SortOrder]; setSortKey(key); setSortOrder(order); };
  const handleItemsPerPageChange = (value: string) => setItemsPerPage(Number(value));
  const handleClearSearch = () => setSearchTerm('');

  const renderSortIcon = (key: SortKey) => {
    if (sortKey === key) return sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" aria-label="Sorted ascending" /> : <ArrowDown className="ml-1 h-3 w-3" aria-label="Sorted descending" />;
    return <ArrowUpDown className="ml-1 h-3 w-3 text-gray-400" aria-label="Not sorted" />;
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-background text-foreground min-h-screen flex flex-col items-center justify-center" role="status" aria-live="polite" aria-label="Loading mutual rankings data">
        <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:text-gray-50 animate-pulse" aria-busy="true">
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-8 w-1/3" aria-hidden="true" /><Skeleton className="h-8 w-1/4" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(itemsPerPage)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-12" aria-hidden="true" /><Skeleton className="h-8 flex-grow" aria-hidden="true" /><Skeleton className="h-8 w-20" aria-hidden="true" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-background text-foreground min-h-screen flex flex-col items-center justify-center" role="alert" aria-live="assertive">
        <Card className="w-full max-w-md mx-auto border-red-500 shadow-lg dark:bg-gray-800 dark:text-gray-50">
          <CardHeader className="flex flex-row items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-red-500" aria-hidden="true" /><CardTitle className="text-xl font-semibold text-red-500">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-400">An unexpected error occurred while fetching mutual rankings. Please try again later.</p>
            <p className="text-sm text-red-300 mt-2">Error Details: {error?.message || 'Unknown error occurred.'}</p>
            <Button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700 text-white">Reload Page</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 bg-background text-foreground min-h-screen" aria-labelledby="leaderboard-title">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:text-gray-50">
        <CardHeader>
          <CardTitle id="leaderboard-title" className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" aria-hidden="true" /> Mutual Rankings
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">View and sort mutual rankings among users.</CardDescription>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              <Input
                type="text" placeholder="Search rankings by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" aria-label="Search rankings by name"
              />
              {searchTerm && (
                <TooltipProvider><Tooltip><TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:bg-transparent" onClick={handleClearSearch} aria-label="Clear search">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger><TooltipContent><p>Clear search</p></TooltipContent></Tooltip></TooltipProvider>
              )}
            </div>
            <Select onValueChange={handleSortChange} defaultValue={`${sortKey}:${sortOrder}`}>
              <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600" aria-label="Sort rankings by">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="rank:asc">Rank (Ascending)</SelectItem><SelectItem value="rank:desc">Rank (Descending)</SelectItem>
                <SelectItem value="score:asc">Score (Ascending)</SelectItem><SelectItem value="score:desc">Score (Descending)</SelectItem>
                <SelectItem value="name:asc">Name (A-Z)</SelectItem><SelectItem value="name:desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {totalItems === 0 ? (
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 py-8" role="status">
              {searchTerm ? `No results found for "${searchTerm}".` : 'No mutual rankings available at this time.'}
            </p>
          ) : (
            <div className="overflow-x-auto border rounded-md dark:border-gray-700">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" aria-label="Mutual Rankings Leaderboard">
                <TableHeader className="bg-gray-50 dark:bg-gray-700">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSortChange(`rank:${sortKey === 'rank' && sortOrder === 'asc' ? 'desc' : 'asc'}`)}>
                      <div className="flex items-center">Rank {renderSortIcon('rank')}</div>
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSortChange(`name:${sortKey === 'name' && sortOrder === 'asc' ? 'desc' : 'asc'}`)}>
                      <div className="flex items-center">Name {renderSortIcon('name')}</div>
                    </TableHead>
                    <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleSortChange(`score:${sortKey === 'score' && sortOrder === 'asc' ? 'desc' : 'asc'}`)}>
                      <div className="flex items-center justify-end">Score {renderSortIcon('score')}</div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {rankings.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                          {item.rank <= 3 && <Trophy className={`h-5 w-5 ${item.rank === 1 ? 'text-yellow-400' : item.rank === 2 ? 'text-gray-400' : 'text-amber-600'}`} aria-label={`Rank ${item.rank}`} />}
                          {item.rank}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                          {item.avatarUrl && (<Avatar className="h-8 w-8"><AvatarImage src={item.avatarUrl} alt={`${item.name}'s avatar`} /><AvatarFallback>{item.name.charAt(0)}</AvatarFallback></Avatar>)}
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-right">{item.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center mt-6 p-2 border-t dark:border-gray-700 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Items per page:</span>
            <Select onValueChange={handleItemsPerPageChange} defaultValue={String(itemsPerPage)}>
              <SelectTrigger className="w-[70px] dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600" aria-label="Select items per page">
                <SelectValue placeholder={String(itemsPerPage)} />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {ITEMS_PER_PAGE_OPTIONS.map(option => (<SelectItem key={option} value={String(option)}>{option}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center space-x-4">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="outline" size="sm" className="dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Previous page">
                <ChevronLeft className="h-4 w-4 mr-2" aria-hidden="true" /> Previous
              </Button>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalItems > 0 ? totalPages : 1}</span>
              </span>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages || totalItems === 0} variant="outline" size="sm" className="dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Next page">
                Next <ChevronRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LeaderboardsMutualRankingsScreen;
