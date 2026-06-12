// AUTO-GENERATED DRAFT SCREEN: CryptoSentimentAnalysis
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook usage
import { cn } from '@/lib/utils'; // For shadcn/ui utility
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Example shadcn/ui component
import { Skeleton } from '@/components/ui/skeleton'; // For loading states
import { Badge } from '@/components/ui/badge'; // For sentiment indicator
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // For error display
import { Terminal } from 'lucide-react'; // Example icon for alert

// Define the expected data structure from tRPC
interface SentimentData {
  cryptoName: string;
  sentimentScore: number;
  analysis: string;
  timestamp: string;
  // Adding more fields for richer display
  positiveMentions: number;
  negativeMentions: number;
  neutralMentions: number;
  sourceCount: number;
}

interface CryptoSentimentAnalysisProps {
  cryptoId: string; // Example prop for fetching specific crypto data
}

const CryptoSentimentAnalysis: React.FC<CryptoSentimentAnalysisProps> = ({ cryptoId }) => {
  // Simulate tRPC query with a slight delay to show loading states
  const { data, isLoading, isError, error } = useQuery<SentimentData, Error>({
    queryKey: ['sentiment', cryptoId],
    queryFn: async () => {
      // In a real application, this would be a tRPC call:
      // const response = await trpc.crypto.getSentiment.query({ cryptoId });
      // return response;
      return new Promise((resolve) => {
        setTimeout(() => {
          const score = Math.random() * 2 - 1; // -1 to 1
          resolve({
            cryptoName: 'SKYCOIN4444',
            sentimentScore: score,
            analysis: score > 0.3 ? 'Strong positive sentiment detected across various sources.' : 
                      score < -0.3 ? 'Significant negative sentiment observed, caution advised.' : 
                      'Overall sentiment is mixed with some neutral trends.',
            timestamp: new Date().toISOString(),
            positiveMentions: Math.floor(Math.random() * 1000),
            negativeMentions: Math.floor(Math.random() * 500),
            neutralMentions: Math.floor(Math.random() * 700),
            sourceCount: Math.floor(Math.random() * 50) + 10,
          });
        }, 1500);
      });
    },
    // Keep data fresh for a short period, then refetch
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Retry on failure
    retry: 3,
  });

  // Determine sentiment badge variant based on score
  const getSentimentVariant = (score: number | undefined) => {
    if (score === undefined) return 'secondary';
    if (score > 0.3) return 'default'; // Positive
    if (score < -0.3) return 'destructive'; // Negative
    return 'outline'; // Neutral
  };

  // Determine sentiment text
  const getSentimentText = (score: number | undefined) => {
    if (score === undefined) return 'N/A';
    if (score > 0.3) return 'Positive';
    if (score < -0.3) return 'Negative';
    return 'Neutral';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4" aria-live="polite" aria-atomic="true">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-40 w-full" /> {/* Placeholder for chart */}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Alert variant="destructive" className="w-full max-w-2xl">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            Failed to load sentiment data for {cryptoId || 'the requested cryptocurrency'}. Please try again later.
            {error?.message && <p className="mt-2 text-sm">Details: {error.message}</p>}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-background text-foreground p-4 flex items-center justify-center", "dark")}> {/* Apply dark theme class */}
      <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-card-foreground text-primary-foreground p-6">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Crypto Sentiment Analysis: {data?.cryptoName}</CardTitle>
          <CardDescription className="text-sm opacity-80 mt-1">Insights into market sentiment for {data?.cryptoName}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Sentiment Score:</p>
            <Badge variant={getSentimentVariant(data?.sentimentScore)} className="text-lg px-4 py-1.5">
              {data?.sentimentScore?.toFixed(2)} ({getSentimentText(data?.sentimentScore)})
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold">Analysis:</p>
            <p className="text-base text-muted-foreground leading-relaxed">{data?.analysis}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium">Positive Mentions:</span> {data?.positiveMentions}</p>
              <p><span className="font-medium">Negative Mentions:</span> {data?.negativeMentions}</p>
              <p><span className="font-medium">Neutral Mentions:</span> {data?.neutralMentions}</p>
            </div>
            <div>
              <p><span className="font-medium">Sources Analyzed:</span> {data?.sourceCount}</p>
              <p className="text-muted-foreground"><span className="font-medium">Last Updated:</span> {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}</p>
            </div>
          </div>

          {/* Placeholder for a sentiment trend chart */}
          <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            <p>Sentiment Trend Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoSentimentAnalysis;
