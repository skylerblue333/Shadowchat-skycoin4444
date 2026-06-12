// AUTO-GENERATED DRAFT SCREEN: ConversationInsights

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Terminal, Loader2, Info } from 'lucide-react';
import { Separator } from './components/ui/separator';
import { Badge } from './components/ui/badge';
import { Skeleton } from './components/ui/skeleton';

interface ConversationInsight {
  id: string;
  speaker: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  timestamp: string;
}

interface ConversationData {
  conversationId: string;
  title: string;
  duration: number;
  insights: ConversationInsight[];
}

const ConversationInsights: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data, isLoading, isError, error, refetch } = trpc.getConversationInsights.useQuery(
    { conversationId: 'example-123' }, // Replace with dynamic conversation ID
    { 
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      retry: 3, // Retry failed queries 3 times
      onError: (err) => {
        console.error('Failed to fetch conversation insights:', err);
      },
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading conversation insights...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Insights</AlertTitle>
          <AlertDescription>
            <p>We encountered an issue while fetching your conversation insights.</p>
            <p className="mt-2">Details: {error?.message || 'Unknown error occurred.'}</p>
            <button 
              onClick={() => refetch()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const getSentimentColor = (sentiment: ConversationInsight['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500/20 text-green-600';
      case 'negative': return 'bg-red-500/20 text-red-600';
      case 'neutral': return 'bg-yellow-500/20 text-yellow-600';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">AI: Conversation Insights</h1>
        <div className="flex items-center space-x-3">
          <Label htmlFor="dark-mode-switch" className="text-lg">Dark Mode</Label>
          <Switch
            id="dark-mode-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
          />
        </div>
      </div>

      <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center"><Info className="mr-2 h-5 w-5" />Conversation Summary</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Overview of the conversation and key metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-2">Title: {data?.title || 'N/A'}</p>
          <p className="text-md text-gray-700 dark:text-gray-300">Duration: {data?.duration ? `${Math.floor(data.duration / 60)}m ${data.duration % 60}s` : 'N/A'}</p>
          <p className="text-md text-gray-700 dark:text-gray-300">Total Insights: {data?.insights.length || 0}</p>
        </CardContent>
      </Card>

      <Separator className="my-8 dark:bg-gray-700" />

      <h2 className="text-3xl font-bold mb-6">Detailed Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.insights.map((insight) => (
          <Card key={insight.id} className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Speaker: {insight.speaker}</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">{new Date(insight.timestamp).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{insight.text}</p>
              <div className="flex items-center mb-2">
                <span className="font-medium mr-2">Sentiment:</span>
                <Badge className={getSentimentColor(insight.sentiment)}>{insight.sentiment}</Badge>
              </div>
              <div className="flex flex-wrap items-center">
                <span className="font-medium mr-2">Keywords:</span>
                {insight.keywords.length > 0 ? (
                  insight.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary" className="mr-2 mb-2 dark:bg-gray-700 dark:text-gray-200">{keyword}</Badge>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">No keywords</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConversationInsights;
