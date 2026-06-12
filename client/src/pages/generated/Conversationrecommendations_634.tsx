// AUTO-GENERATED DRAFT SCREEN: ConversationRecommendations
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SunIcon, MoonIcon, RefreshCcw } from 'lucide-react';

// Mock tRPC-like hooks for demonstration
const trpc = {
  conversation: {
    getRecommendations: (params: { userId: string; count: number; category?: string }) =>
      new Promise<string[]>((resolve) => {
        setTimeout(() => {
          const mockRecommendations = [
            `Discuss ${params.category || 'general'} AI ethics in healthcare.`,
            `Explore new applications of large language models.`,
            `Debate the future of AI in creative industries.`,
            `Analyze the impact of AI on job markets.`,
            `Review recent advancements in AI safety.`,
            `Consider the role of AI in personalized education.`,
            `Examine AI's influence on data privacy.`,
            `Discuss the challenges of AI deployment in enterprise.`,
            `Brainstorm AI solutions for climate change.`,
            `Evaluate the effectiveness of current AI regulations.`,
          ];
          const filtered = params.category
            ? mockRecommendations.filter((rec) =>
                rec.toLowerCase().includes(params.category!.toLowerCase())
              )
            : mockRecommendations;
          resolve(filtered.slice(0, params.count));
        }, 1000);
      }),
  },
};

interface ConversationRecommendationsProps {
  userId: string;
}

const ConversationRecommendations: React.FC<ConversationRecommendationsProps> = ({ userId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data: recommendations, isLoading, isError, refetch } = useQuery({
    queryKey: ['conversationRecommendations', userId, categoryFilter],
    queryFn: () => trpc.conversation.getRecommendations({ userId, count: 5, category: categoryFilter || undefined }),
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 dark:text-red-400">
        Error loading recommendations. Please try again.
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Card className="w-full max-w-2xl mx-auto shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">AI Conversation Recommendations</CardTitle>
          <div className="flex items-center space-x-2">
            {isDarkTheme ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            <Switch
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              id="dark-mode-switch"
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-switch" className="sr-only">Toggle Dark Mode</Label>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Filter by category (e.g., 'ethics')"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-grow dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              aria-label="Filter recommendations by category"
            />
            <Button onClick={() => refetch()} disabled={isLoading} aria-label="Refresh recommendations">
              <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <RefreshCcw className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-400" />
              <span className="ml-2">Loading recommendations...</span>
            </div>
          ) : (
            <ScrollArea className="h-[200px] w-full rounded-md border p-4 dark:border-gray-700">
              {recommendations && recommendations.length > 0 ? (
                <div className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <React.Fragment key={index}>
                      <p className="text-sm md:text-base">{rec}</p>
                      {index < recommendations.length - 1 && <Separator className="dark:bg-gray-700" />}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No recommendations found. Try a different filter or refresh.</p>
              )}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationRecommendations;
