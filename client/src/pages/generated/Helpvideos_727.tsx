// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import * as __ns_lucide_react_1 from 'lucide-react';
const { AlertCircle, Sun, Moon } = (__ns_lucide_react_1 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: HelpVideos

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


// Define the structure for a video object
interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

/**
 * HelpVideos Component
 * Displays a list of help videos, with features like loading states, error handling,
 * dark mode toggle, and accessibility considerations.
 */
const HelpVideos: React.FC = () => {
  // State to manage dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to apply or remove dark mode class on the document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Persist dark mode preference (optional, for a real application)
    // localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Fetch video data using tRPC and react-query
  const { data: videos, isLoading, isError, error, refetch } = useStubQuery();

  // Render loading state with multiple skeleton cards for better user experience
  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen animate-pulse">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Loading Help Videos...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700 shadow-md">
              <CardHeader>
                <Skeleton className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 mb-2" />
                <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full bg-gray-200 dark:bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Render error state with a clear message and a retry option
  if (isError) {
    return (
      <div role="alert" className="p-6 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700 rounded-lg shadow-md flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Error loading help videos:</h1>
        <p className="text-lg text-center mb-4">{error.message || 'An unexpected error occurred.'}</p>
        <Button 
          onClick={() => refetch()} 
          className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200"
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Main component rendering for displaying help videos
  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100" aria-live="polite">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-5xl font-extrabold tracking-tight">Help Videos</h1>
        <Button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          variant="outline"
          size="icon"
          className="transition-colors duration-200"
        >
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </div>

      <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
        Explore our comprehensive library of video tutorials designed to guide you through various features and functionalities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {videos?.map((video) => (
          <Card key={video.id} className="flex flex-col dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader className="flex-grow p-4">
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">{video.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-shrink-0 p-4 pt-0">
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="block group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                <img 
                  src={video.thumbnail} 
                  alt={`Thumbnail for ${video.title}`} 
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity duration-300"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200">
                  Watch Video
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HelpVideos;