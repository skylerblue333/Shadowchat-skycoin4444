// AUTO-GENERATED DRAFT SCREEN: RewardsRewardSharingScreen
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'; // Using @tanstack/react-query for tRPC hooks
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';

// Mock tRPC client for demonstration purposes
// In a real application, this would be configured to connect to a tRPC server
const trpc = {
  rewards: {
    getRewards: async () => {
      // Simulate API call
      return new Promise<Reward[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', name: 'Referral Bonus', amount: 100, currency: 'SKY' },
            { id: '2', name: 'Staking Rewards', amount: 50, currency: 'SKY' },
          ]);
        }, 1000);
      });
    },
    getShareOptions: async () => {
      // Simulate API call
      return new Promise<ShareOption[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: '1', name: 'Share with Friends', enabled: true },
            { id: '2', name: 'Donate to Charity', enabled: false },
          ]);
        }, 800);
      });
    },
    shareReward: async ({ recipient, amount }: { recipient: string; amount: number }) => {
      // Simulate API call
      return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (amount > 0 && recipient) {
            resolve(`Successfully shared ${amount} SKY with ${recipient}`);
          } else {
            reject(new Error('Invalid recipient or amount.'));
          }
        }, 1500);
      });
    },
  },
};

// Define types for rewards and sharing options
interface Reward {
  id: string;
  name: string;
  amount: number;
  currency: string;
}

interface ShareOption {
  id: string;
  name: string;
  enabled: boolean;
}

const RewardsRewardSharingScreen: React.FC = () => {
  // tRPC hooks for data fetching and mutations
  const { data: rewards, isLoading: isLoadingRewards, error: rewardsError } = useQuery({ queryKey: ['rewards', 'getRewards'], queryFn: trpc.rewards.getRewards });
  const { data: shareOptions, isLoading: isLoadingShareOptions, error: shareOptionsError } = useQuery({ queryKey: ['rewards', 'getShareOptions'], queryFn: trpc.rewards.getShareOptions });
  const shareRewardMutation = useMutation({ mutationFn: trpc.rewards.shareReward });

  // State for sharing input (e.g., recipient, amount)
  const [recipient, setRecipient] = React.useState<string>('');
  const [shareAmount, setShareAmount] = React.useState<number>(0);
  const [isSharingEnabled, setIsSharingEnabled] = React.useState<boolean>(false);

  const handleShare = () => {
    if (recipient && shareAmount > 0) {
      shareRewardMutation.mutate({ recipient, amount: shareAmount });
    }
  };

  if (isLoadingRewards || isLoadingShareOptions) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-gray-100">
        <p>Loading rewards and sharing options...</p>
      </div>
    );
  }

  if (rewardsError || shareOptionsError) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-gray-100 text-red-500">
        <p>Error loading data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reward Sharing</CardTitle>
          <CardDescription>Manage and share your accumulated rewards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Rewards Section */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Your Current Rewards</h3>
            {rewards && rewards.length > 0 ? (
              <ul className="space-y-2">
                {rewards.map((reward: Reward) => (
                  <li key={reward.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <span>{reward.name}:</span>
                    <span className="font-medium">{reward.amount} {reward.currency}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No rewards available yet.</p>
            )}
          </section>

          {/* Share Rewards Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold mb-3">Share Rewards</h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="share-toggle"
                checked={isSharingEnabled}
                onCheckedChange={setIsSharingEnabled}
                aria-label="Toggle reward sharing"
              />
              <Label htmlFor="share-toggle">Enable Reward Sharing</Label>
            </div>

            {isSharingEnabled && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input
                    id="recipient"
                    type="text"
                    placeholder="Enter recipient's username or ID"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="share-amount">Amount to Share</Label>
                  <Input
                    id="share-amount"
                    type="number"
                    placeholder="0"
                    value={shareAmount}
                    onChange={(e) => setShareAmount(parseFloat(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={handleShare}
                  disabled={!recipient || shareAmount <= 0 || shareRewardMutation.isPending}
                  className="w-full"
                >
                  {shareRewardMutation.isPending ? 'Sharing...' : 'Share Reward'}
                </Button>
                {shareRewardMutation.isSuccess && <p className="text-green-500 text-sm mt-2">Reward shared successfully!</p>}
                {shareRewardMutation.isError && <p className="text-red-500 text-sm mt-2">Failed to share reward: {shareRewardMutation.error?.message}</p>}
              </div>
            )}
          </section>

          {/* Sharing Options/Settings Section */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Sharing Settings</h3>
            {shareOptions && shareOptions.length > 0 ? (
              <ul className="space-y-2">
                {shareOptions.map((option: ShareOption) => (
                  <li key={option.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <span>{option.name}</span>
                    <Switch checked={option.enabled} disabled aria-label={`Toggle ${option.name}`}/>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No specific sharing settings available.</p>
            )}
          </section>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rewards are subject to terms and conditions.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RewardsRewardSharingScreen;
