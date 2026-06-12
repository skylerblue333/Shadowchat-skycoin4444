// AUTO-GENERATED DRAFT SCREEN: FollowSuggestions
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isFollowing: boolean;
}

interface FollowSuggestionsProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const FollowSuggestions: React.FC<FollowSuggestionsProps> = ({ users, isLoading, isError, error }) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Follow Suggestions</CardTitle>
          <CardDescription>People you might know</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Follow Suggestions</CardTitle>
          <CardDescription>People you might know</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 dark:text-red-400">Error loading suggestions: {error?.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Follow Suggestions</CardTitle>
        <CardDescription>People you might know</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user: User) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.handle}</p>
                </div>
              </div>
              <Button variant={user.isFollowing ? "outline" : "default"}>
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowSuggestions;
