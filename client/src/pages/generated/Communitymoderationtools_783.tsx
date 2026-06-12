// AUTO-GENERATED DRAFT SCREEN: CommunityModerationTools
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC uses react-query
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn/ui card
import { Switch } from "@/components/ui/switch"; // shadcn/ui switch for dark mode
import { Label } from "@/components/ui/label";

// Mock tRPC client for demonstration
const trpc = {
  moderation: {
    getPendingPosts: {
      useQuery: () => useQuery<string[], Error>({
        queryKey: ["pendingPosts"],
        queryFn: async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (Math.random() > 0.8) throw new Error("Failed to fetch posts");
          return ["Post 1: Spam content", "Post 2: Hate speech", "Post 3: Misinformation"];
        },
      }),
    },
    approvePost: {
      useMutation: () => ({ mutate: (id: string) => console.log(`Approving ${id}`), isLoading: false }),
    },
    rejectPost: {
      useMutation: () => ({ mutate: (id: string) => console.log(`Rejecting ${id}`), isLoading: false }),
    },
  },
};

interface CommunityModerationToolsProps {}

const CommunityModerationTools: React.FC<CommunityModerationToolsProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: pendingPosts, isLoading, isError, error } = trpc.moderation.getPendingPosts.useQuery();

  const handleApprove = (post: string) => {
    // Simulate tRPC mutation
    console.log(`Approving: ${post}`);
  };

  const handleReject = (post: string) => {
    // Simulate tRPC mutation
    console.log(`Rejecting: ${post}`);
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-gray-50' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Community Moderation Tools</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      {isLoading && (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Loading Posts...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-4">Fetching pending posts for moderation...</p>
          </CardContent>
        </Card>
      )}

      {isError && (
        <Card className="w-full max-w-2xl mx-auto mt-8 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">Error loading posts: {error?.message || 'Unknown error'}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && pendingPosts && pendingPosts.length === 0 && (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>No Pending Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-4">All clear! No posts currently require moderation.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && pendingPosts && pendingPosts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {pendingPosts.map((post, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Pending Post {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{post}</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="destructive" onClick={() => handleReject(post)}>Reject</Button>
                  <Button onClick={() => handleApprove(post)}>Approve</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityModerationTools;
