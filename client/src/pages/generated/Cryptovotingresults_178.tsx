// AUTO-GENERATED DRAFT SCREEN: CryptoVotingResults
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useQuery, useMutation } from '@tanstack/react-query'; // Placeholder for tRPC hooks
import { cn } from '@/lib/utils'; // Utility for conditional class names

interface VotingResult {
  option: string;
  votes: number;
  percentage: number;
}

interface VotingData {
  question: string;
  results: VotingResult[];
  totalVotes: number;
  userVoted: boolean;
}

// Mock API calls for demonstration. In a real app, these would be tRPC hooks.
const fetchVotingResults = async (): Promise<VotingData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        question: 'Which crypto project will have the most impact in 2024?',
        results: [
          { option: 'SKYCOIN4444', votes: 1200, percentage: 60 },
          { option: 'Etherium', votes: 500, percentage: 25 },
          { option: 'Solana', votes: 300, percentage: 15 },
        ],
        totalVotes: 2000,
        userVoted: false,
      });
    }, 1000);
  });
};

const submitVote = async (option: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Voted for: ${option}`);
      resolve();
    }, 500);
  });
};

const CryptoVotingResults: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<VotingData, Error>({
    queryKey: ['votingResults'],
    queryFn: fetchVotingResults,
  });

  const voteMutation = useMutation<void, Error, string>({
    mutationFn: submitVote,
    onSuccess: () => {
      refetch(); // Refresh results after voting
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900" aria-live="polite" aria-atomic="true">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading voting results...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900" aria-live="assertive" aria-atomic="true">
        <p className="text-lg text-red-500">Error: {error?.message || 'Failed to load voting results'}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">No voting data available.</p>
      </div>
    );
  }

  const handleVote = (option: string) => {
    if (!data.userVoted && !voteMutation.isPending) {
      voteMutation.mutate(option);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.question}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Total Votes: {data.totalVotes.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.results.map((result) => (
            <div key={result.option} className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-800 dark:text-gray-200">
                <span>{result.option}</span>
                <span>{result.percentage}% ({result.votes.toLocaleString()})</span>
              </div>
              <Progress value={result.percentage} className="h-2" />
              {!data.userVoted && (
                <Button
                  onClick={() => handleVote(result.option)}
                  disabled={voteMutation.isPending}
                  className={cn(
                    "w-full mt-2",
                    result.option === 'SKYCOIN4444' && 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  )}
                >
                  {voteMutation.isPending && voteMutation.variables === result.option ? 'Voting...' : 'Vote'}
                </Button>
              )}
            </div>
          ))}
          {data.userVoted && (
            <p className="text-center text-green-600 dark:text-green-400 font-semibold mt-4">
              Thank you for your vote!
            </p>
          )}
          {voteMutation.isError && (
            <p className="text-center text-red-500 mt-4" aria-live="assertive" aria-atomic="true">
              Failed to submit vote: {voteMutation.error?.message || 'Unknown error'}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoVotingResults;
