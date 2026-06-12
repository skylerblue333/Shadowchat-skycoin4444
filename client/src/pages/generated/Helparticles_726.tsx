// AUTO-GENERATED DRAFT SCREEN: HelpArticles
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
}

// Placeholder for tRPC client - in a real app, this would be configured elsewhere
const trpc = {
  help: {
    getArticles: {
      useQuery: (options?: any) => useQuery<Article[], Error>({
        queryKey: ['helpArticles'],
        queryFn: async () => {
          // Simulate API call
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { id: '1', title: 'Getting Started', content: 'This is how you get started with our service.' },
                { id: '2', title: 'Troubleshooting Common Issues', content: 'Here are solutions to common problems.' },
                { id: '3', title: 'Account Management', content: 'Manage your account settings and preferences.' },
                { id: '4', title: 'Privacy Policy', content: 'Our commitment to your data privacy.' },
                { id: '5', title: 'Terms of Service', content: 'The legal terms governing your use of our service.' },
              ]);
            }, 1000);
          });
        },
        ...options,
      }),
    },
  },
};

export const HelpArticles: React.FC = () => {
  const { data: articles, isLoading, isError, error } = trpc.help.getArticles.useQuery();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load help articles: {error?.message || 'Unknown error'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Help Articles</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <Card key={article.id} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>{article.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HelpArticles;
