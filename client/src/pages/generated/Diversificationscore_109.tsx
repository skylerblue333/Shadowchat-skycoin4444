// AUTO-GENERATED DRAFT SCREEN: DiversificationScore
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card component
import { Progress } from './ui/progress'; // Assuming shadcn/ui progress component
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // Assuming shadcn/ui alert component
import { Terminal } from 'lucide-react'; // Assuming Lucide icon for alert

// Simulate tRPC hook for fetching diversification score
interface DiversificationScoreData {
  score: number;
  maxScore: number;
}

interface UseDiversificationScoreResult {
  data: DiversificationScoreData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
}

const useDiversificationScore = (): UseDiversificationScoreResult => {
  const [data, setData] = useState<DiversificationScoreData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Simulate successful data fetch
        setData({ score: 75, maxScore: 100 });
        // Simulate error condition for testing
        // throw new Error('Failed to fetch diversification score');
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError, error };
};

const DiversificationScore: React.FC = () => {
  const { data, isLoading, isError, error } = useDiversificationScore();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Loading Diversification Score...</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={null} className="w-full" /> {/* Indeterminate progress */}
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Fetching your crypto diversification data.</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-red-600 dark:text-red-400">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Failed to load data</AlertTitle>
            <AlertDescription>{error || 'Please try again later.'}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">No Data Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Could not retrieve diversification score.</p>
        </CardContent>
      </Card>
    );
  }

  const { score, maxScore } = data;
  const percentage = (score / maxScore) * 100;

  const getScoreColor = (currentPercentage: number) => {
    if (currentPercentage >= 80) return 'bg-green-500';
    if (currentPercentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">Crypto Diversification Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Score:</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{score} / {maxScore}</span>
        </div>
        <Progress
          value={percentage}
          className={`w-full ${getScoreColor(percentage)}`}
          aria-label="Diversification Score Progress"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
          Your current diversification score is {percentage.toFixed(1)}%.
        </p>
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Tips for Improvement:</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Consider diversifying across different blockchain ecosystems.</li>
            <li>Invest in assets with varying market capitalizations.</li>
            <li>Explore stablecoins and DeFi protocols for balanced exposure.</li>
            <li>Regularly rebalance your portfolio to maintain desired allocations.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiversificationScore;
