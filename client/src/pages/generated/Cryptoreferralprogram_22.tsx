// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: CryptoReferralProgram

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


interface Referral {
  id: string;
  referrer: string;
  referred: string;
  status: 'pending' | 'completed';
  reward: number;
}

// Simulated tRPC API calls
const api = {
  referral: {
    getReferrals: async (): Promise<Referral[]> => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: '1', referrer: 'user1', referred: 'friendA', status: 'completed', reward: 10 },
        { id: '2', referrer: 'user1', referred: 'friendB', status: 'pending', reward: 5 },
      ];
    },
    generateReferralLink: async (userId: string): Promise<string> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return `https://skycoin4444.com/referral?code=${userId}-ref`;
    },
  },
};

const CryptoReferralProgram: React.FC = () => {
  const userId = 'user1'; // This would typically come from an auth context
  const [referralLink, setReferralLink] = useState<string>('');

  const { data: referrals, isLoading, isError, error } = useQuery<Referral[], Error>({
    queryKey: ['referrals', userId],
    queryFn: () => api.referral.getReferrals(),
  });

  const generateLinkMutation = useMutation<string, Error, string>({
    mutationFn: (id) => api.referral.generateReferralLink(id),
    onSuccess: (link) => {
      setReferralLink(link);
    },
  });

  useEffect(() => {
    if (!referralLink && !generateLinkMutation.isLoading && !generateLinkMutation.isSuccess) {
      generateLinkMutation.mutate(userId);
    }
  }, [userId, referralLink, generateLinkMutation]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">Loading referral data...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 dark:bg-gray-900">Error: {error?.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center dark:text-white">Crypto: Referral Program</CardTitle>
          <CardDescription className="text-center dark:text-gray-400">Invite your friends and earn rewards!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="referral-link" className="text-lg dark:text-gray-300">Your Referral Link</Label>
            <div className="flex space-x-2">
              <Input
                id="referral-link"
                type="text"
                value={referralLink}
                readOnly
                className="flex-grow dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                aria-label="Your unique referral link"
              />
              <Button
                onClick={() => navigator.clipboard.writeText(referralLink)}
                className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold dark:text-white">Your Referrals</h2>
            {referrals && referrals.length > 0 ? (
              <Table className="dark:bg-gray-700 dark:text-gray-100 rounded-md overflow-hidden">
                <TableHeader>
                  <TableRow className="dark:bg-gray-600">
                    <TableHead className="dark:text-gray-300">Referred User</TableHead>
                    <TableHead className="dark:text-gray-300">Status</TableHead>
                    <TableHead className="text-right dark:text-gray-300">Reward</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.id} className="dark:border-gray-600">
                      <TableCell className="font-medium dark:text-gray-200">{referral.referred}</TableCell>
                      <TableCell className="dark:text-gray-200">{referral.status}</TableCell>
                      <TableCell className="text-right dark:text-gray-200">{referral.reward} SKY</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No referrals yet. Share your link to get started!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoReferralProgram;
